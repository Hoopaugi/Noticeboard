import { HydratedDocument } from 'mongoose'

import { Notice } from '../api/notice/notice.interfaces'
import { User } from '../api/user/user.interfaces'

export interface Database {
  notices: Notice[]
  users: HydratedDocument<User>[]
}
