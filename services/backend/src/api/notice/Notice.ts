import { Schema, model } from 'mongoose'

import { Notice as INotice } from './notice.interfaces'

const noticeSchema = new Schema<INotice>({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    },
  },
})

const Notice = model<INotice>('Notice', noticeSchema)

export default Notice
