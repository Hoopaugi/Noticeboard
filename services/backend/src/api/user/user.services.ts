import { HydratedDocument } from 'mongoose'

import User from './User'
import { User as IUser } from './user.interfaces'

const create = async (user: IUser): Promise<HydratedDocument<IUser>> => {
  const newUser = await User.create(user)

  return newUser
}

const findByUsername = async (username: string): Promise<HydratedDocument<IUser> | null> => {
  const user = await User.findOne({ username })

  return user
}

export default { create, findByUsername }
