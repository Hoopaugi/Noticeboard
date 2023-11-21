import { Router } from 'express'

import healthRouter from './health'
import noticeRouter from './notice'
import userRouter from './user'

const router = Router()

router.use('/ping', healthRouter)
router.use('/notices', noticeRouter)
router.use('/users', userRouter)

export default router
