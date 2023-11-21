import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '../config'

export const hashPassowrd = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  return passwordHash
}
