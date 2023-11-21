import { Request, Response, NextFunction } from 'express'

import userServices from './user.services'
import { toNewUser } from './user.helpers'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await toNewUser(req)

    const user = await userServices.create(newUser)
  
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export default { create }
