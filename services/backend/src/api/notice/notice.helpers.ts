import { Request } from 'express'

import { Notice as INotice } from './notice.interfaces'

export const toNewNotice = (req: Request): INotice => {
  const body = req.body

  const newNotice = {
    title: body.title,
    content: body.content
  }

  return newNotice
}
