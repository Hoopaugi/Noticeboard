import { Request, Response, NextFunction } from 'express'

import { RequestWithUser } from './auth.interfaces'
import { AppError } from '../errors'
import authServices from './auth.services'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body

    const token = await authServices.login(username, password)
  
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
