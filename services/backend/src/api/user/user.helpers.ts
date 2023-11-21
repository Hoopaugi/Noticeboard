import { Request } from 'express'

import { AppError } from '../../errors'
import { User as IUser } from './user.interfaces'
import { isString } from '../../helpers'
import { hashPassowrd } from '../../auth/auth.helpers'

export const toNewUser = async (req: Request): Promise<IUser> => {
  const body = req.body

  if (!body) {
    throw new AppError('missing body', 400)
  }

  const newUser = {
    username: parseUsername(body.username),
    passwordHash: await parsePasswordHash(body.password)
  }

  return newUser
}

const parseUsername = (username: unknown): string => {
  if (!username) {
    throw new AppError('missing username', 400)
  }

  if (!isString(username)) {
    throw new AppError(`invalid username ${username}`, 400)
  }

  return username
}

const parsePasswordHash = async (password: unknown): Promise<string> => {
  if (!password) {
    throw new AppError('missing password', 400)
  }

  if (!isString(password)) {
    throw new AppError('invalid password', 400)
  }

  const passwordHash = await hashPassowrd(password)

  return passwordHash
}
