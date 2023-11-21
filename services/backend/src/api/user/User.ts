import { Schema, model } from 'mongoose'

import { User as IUser } from './user.interfaces'

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret.passwordHash
      delete ret._id
      delete ret.__v
    },
  },
})

const User = model<IUser>('User', userSchema)

export default User
