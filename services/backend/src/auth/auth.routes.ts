import { Router } from 'express'

import handlers from './auth.handlers'
import { userExtractor } from './auth.middlewares'

const router = Router()

router.post('/login', handlers.login)
router.get('/me', userExtractor, handlers.me)

export default router
