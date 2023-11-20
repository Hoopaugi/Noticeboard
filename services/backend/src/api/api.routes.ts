import { Router } from 'express'

import healthRouter from './health'
import noticeRouter from './notice'

const router = Router()

router.use('/ping', healthRouter)
router.use('/notice', noticeRouter)

export default router
