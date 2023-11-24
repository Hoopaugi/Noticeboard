import { Types } from 'mongoose'

export interface Notice {
  title: string
  content: string
  user: Types.ObjectId
}
