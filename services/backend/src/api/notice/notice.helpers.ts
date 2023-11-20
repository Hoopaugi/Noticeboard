import { Request } from 'express'

import { AppError } from '../../errors'
import { Notice as INotice } from './notice.interfaces'
import { isString } from '../../helpers'

export const toNewNotice = (req: Request): INotice => {
  const body = req.body

  if (!body) {
    throw new AppError('missing body', 400)
  }

  const newNotice = {
    title: parseTitle(body.title),
    content: parseContent(body.content)
  }

  return newNotice
}

const parseTitle = (title: unknown): string => {
  if (!title) {
    throw new AppError('missing title', 400)
  }

  if (!isString(title)) {
    throw new AppError(`invalid title ${title}`, 400)
  }

  return title
}

const parseContent = (content: unknown): string => {
  if (!content) {
    throw new AppError('missing content', 400)
  }

  if (!isString(content)) {
    throw new AppError(`invalid content ${content}`, 400)
  }

  return content
}
