import { Request, Response, NextFunction } from 'express'

import userServices from '../api/user/user.services'
import { RequestWithUser } from './auth.interfaces'
import { AppError } from '../errors'
import { passwordCorrect, signUserToken } from './auth.helpers'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body

    const user = await userServices.findByUsername(username)
  
    if (!user) {
      throw new AppError('no user found', 404)
    }
  
    const correct = await passwordCorrect(password, user.passwordHash)

    if(!correct) {
      throw new AppError('invalid username or password', 400)
    }
  
    const token = await signUserToken({ username, id: user._id.toString() })
  
    res.json({ username, token })
  } catch (error) {
    next(error)
  }
}

const me = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('user not found', 404)
    }

    res.json(req.user)
  } catch (error) {
    next(error)
  }
}

export default { login, me }
