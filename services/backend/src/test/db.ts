import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import Notice from '../api/notice/Notice'
import seeds from './seeds.json'

let mongod: MongoMemoryServer

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
  for (const notice of seeds.notices) {
    await Notice.create(notice)
  }
}

const clear = async () => {
  await Notice.deleteMany({})
}

export default { clear, connect, disconnect, seed }
