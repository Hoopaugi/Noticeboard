import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserForToken, UserTokenPayload } from './auth.interfaces'
import { SALT_ROUNDS, SECRET } from '../config'

export const hashPassowrd = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  return passwordHash
}

export const passwordCorrect = async (password: string, passwordHash: string): Promise<boolean> => {
  const correct = await bcrypt.compare(password, passwordHash)

  return correct
}

export const signUserToken = async (userForToken: UserForToken) => {
  if (!SECRET) {
    throw new Error('SECRET missing from env')
  }

  return jwt.sign(userForToken, SECRET)
}

export const decryptToken = (token: string): string | UserTokenPayload => {
  if (!SECRET) {
    throw new Error('SECRET missing from env')
  }

  return jwt.verify(token, SECRET) as UserTokenPayload
}
