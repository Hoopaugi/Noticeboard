import { Request, Response, NextFunction } from 'express'

import noticeServices from './notice.services'
import { toNewNotice } from './notice.helpers'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newNotice = toNewNotice(req)

    const notice = await noticeServices.create(newNotice)
  
    res.status(201).json(notice)
  } catch (error) {
    next(error)
  }
}

export default { create }
