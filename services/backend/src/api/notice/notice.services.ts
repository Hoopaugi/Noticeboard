import { HydratedDocument } from 'mongoose'

import Notice from './Notice'
import { Notice as INotice } from './notice.interfaces'

const create = async (notice: INotice): Promise<HydratedDocument<INotice>> => {
  const newNotice = await Notice.create(notice)

  return newNotice
}

export default { create }
