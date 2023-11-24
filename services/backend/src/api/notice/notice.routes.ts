import { Router } from 'express'

import handlers from './notice.handlers'
import { userExtractor } from '../../auth/auth.middlewares'

const router = Router()

router.get('/', handlers.findAll)
router.post('/', userExtractor, handlers.create)

export default router
