import { Router } from 'express'

import handlers from './health.handlers'

const router = Router()

router.get('/', handlers.ping)

export default router
