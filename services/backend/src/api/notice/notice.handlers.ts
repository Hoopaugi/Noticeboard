import { Request, Response, NextFunction } from 'express'

import { RequestWithUser } from '../../auth/auth.interfaces'
import noticeServices from './notice.services'
import { toNewNotice } from './notice.helpers'

const create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const newNotice = toNewNotice(req)

    const notice = await noticeServices.create(newNotice)
  
    res.status(201).json(notice)
  } catch (error) {
    next(error)
  }
}

const findAll = async (req: Request, res: Response) => {
  const notices = await noticeServices.findAll()

  res.json(notices)
}

export default { create, findAll }
