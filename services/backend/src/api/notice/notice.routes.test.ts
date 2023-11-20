import request from 'supertest'

import app from '../../app'
import db, { initialDatabase } from '../../test/db'

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe('notice.routes', () => {
  describe('POST /api/notice/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('New notice can be created', async () => {
      const data = {
        'title': 'Another Test Notice',
        'content': 'Another test notice content'
      }

      let res = await request(app).post('/api/notice').send(data)
  
      expect(res.statusCode).toBe(201)

      expect(res.body.id).toBeDefined()
      expect(res.body.title).toBe(data.title)
      expect(res.body.content).toBe(data.content)

      expect(res.body._id).not.toBeDefined()
      expect(res.body.__v).not.toBeDefined()

      res = await request(app).get('/api/notice/')
  
      expect(res.statusCode).toBe(200)

      expect(res.body.length).toBe(initialDatabase.notices.length + 1)
    })
  })

  describe('GET /api/notice/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('All initial notices can be fetched', async () => {
      const res = await request(app).get('/api/notice/')
  
      expect(res.statusCode).toBe(200)

      expect(res.body.length).toBe(initialDatabase.notices.length)
    })
  })
})
