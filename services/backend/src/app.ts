import express, { Express } from 'express'

import apiRouter from './api'
import { errorHandler } from './middlewares'

const app: Express = express()

app.use(express.json())

app.use('/api', apiRouter)

app.use(errorHandler)

export default app
