import { Router } from 'express'

import handlers from './notice.handlers'

const router = Router()

router.get('/', handlers.findAll)
router.post('/', handlers.create)

export default router
