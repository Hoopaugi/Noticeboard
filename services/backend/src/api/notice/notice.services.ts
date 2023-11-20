import { HydratedDocument } from 'mongoose'

import Notice from './Notice'
import { Notice as INotice } from './notice.interfaces'

const create = async (notice: INotice): Promise<HydratedDocument<INotice>> => {
  const newNotice = await Notice.create(notice)

  return newNotice
}

const findAll = async (): Promise<INotice[]> => {
  const notices = await Notice.find({})

  return notices
}

export default { create, findAll }
