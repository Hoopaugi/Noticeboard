import { Types } from 'mongoose'

export interface User {
  username: string
  passwordHash: string
  notices: Types.ObjectId[]
}
