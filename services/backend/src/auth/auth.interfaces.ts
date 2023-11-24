import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'

import { User } from '../api/user/user.interfaces'

export interface UserForToken {
  id: string
  username: string
}

export interface UserTokenPayload extends JwtPayload {
  id: string
  username: string
}

export interface RequestWithUser extends Request {
  user?: HydratedDocument<User>
}
