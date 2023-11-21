import { Router } from 'express'

import handlers from './user.handlers'

const router = Router()

router.post('/', handlers.create)

export default router
