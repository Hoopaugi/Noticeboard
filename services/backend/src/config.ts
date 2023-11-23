import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000
export const MONGO_URL = process.env.MONGO_URL
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10
export const SECRET = process.env.SECRET
