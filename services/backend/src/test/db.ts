import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import Notice from '../api/notice/Notice'
import User from '../api/user/User'
import seeds from './seeds.json'
import { hashPassowrd } from '../auth/auth.helpers'
import { Database } from './interfaces'

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
  const database: Database = {
    notices: [],
    users: []
  }

  for (const user of seeds.users) {
    const passwordHash = await hashPassowrd(user.password)

    const newUser = await User.create({ username: user.username, passwordHash })

    database.users.push(newUser)
  }

  for (const notice of seeds.notices) {
    const newNotice = await Notice.create({ ...notice, user: database.users[0]._id})

    database.users[0].notices.push(newNotice._id)

    database.notices.push(newNotice)
  }

  return database
}

const clear = async () => {
  await Notice.deleteMany({})
}

export default { clear, connect, disconnect, seed }
