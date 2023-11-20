import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import Notice from '../api/notice/Notice'
import seeds from './seeds.json'
import { Database } from './interfaces'

let mongod: MongoMemoryServer

export const initialDatabase: Database = {
  notices: []
}

const connect = async () => {
  mongod = await MongoMemoryServer.create()

  const uri = mongod.getUri()

  await mongoose.connect(uri)
}

const disconnect = async () => {
  await mongoose.connection.close()

  await mongod.stop()
}

const seed = async () => {
  initialDatabase.notices = []

  for (const notice of seeds.notices) {
    const newNotice = await Notice.create(notice)

    initialDatabase.notices.push(newNotice)
  }
}

const clear = async () => {
  await Notice.deleteMany({})
}

export default { clear, connect, disconnect, seed }
