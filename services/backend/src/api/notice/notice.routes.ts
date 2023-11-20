import { Router } from 'express'

import handlers from './notice.handlers'

const router = Router()

router.post('/', handlers.create)

export default router
