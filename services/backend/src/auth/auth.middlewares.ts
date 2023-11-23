import { Response, NextFunction } from 'express'

import { RequestWithUser } from './auth.interfaces'
import { AppError } from '../errors'
import { decryptToken } from './auth.helpers'
import userServices from '../api/user/user.services'

export const userExtractor = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers['authorization']

    if (!(authorization && authorization.startsWith('Bearer '))) {
      throw new AppError('invalid or missing authorization header')
    }
  
    const decryptedToken = decryptToken(authorization.replace('Bearer ', ''))
  
    if(typeof decryptedToken === 'string') {
      throw new AppError('invalid token', 400)
    }
  
    if (!decryptedToken.id) {
      throw new AppError('invalid token', 400)
    }
  
    const user = await userServices.findByUsername(decryptedToken.username)
  
    if (!user) {
      throw new AppError('no user found', 404)
    }
  
    req.user = user
  
    next()
  } catch (error) {
    next(error)
  }
}
