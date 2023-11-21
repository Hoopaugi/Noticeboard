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
  describe('POST /api/notices/', () => {
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

      let res = await request(app).post('/api/notices').send(data)
  
      expect(res.statusCode).toBe(201)

      expect(res.body.id).toBeDefined()
      expect(res.body.title).toBe(data.title)
      expect(res.body.content).toBe(data.content)

      expect(res.body._id).not.toBeDefined()
      expect(res.body.__v).not.toBeDefined()

      res = await request(app).get('/api/notices/')
  
      expect(res.statusCode).toBe(200)

      expect(res.body.length).toBe(initialDatabase.notices.length + 1)
    })

    test('Notice with invalid parameters is rejected', async () => {
      const noticeNoTitle = {
        'content': 'Another test notice content'
      }

      let res = await request(app).post('/api/notices').send(noticeNoTitle)
  
      expect(res.statusCode).toBe(400)

      expect(res.body.message).toBe('missing title')

      const noticeNoContent = {
        'title': 'Another Test Notice'
      }

      res = await request(app).post('/api/notices').send(noticeNoContent)
  
      expect(res.statusCode).toBe(400)

      expect(res.body.message).toBe('missing content')

      res = await (await request(app).get('/api/notices/'))
  
      expect(res.statusCode).toBe(200)

      expect(res.body.length).toBe(initialDatabase.notices.length)
    })
  })

  describe('GET /api/notices/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('All initial notices can be fetched', async () => {
      const res = await request(app).get('/api/notices/')
  
      expect(res.statusCode).toBe(200)

      expect(res.body.length).toBe(initialDatabase.notices.length)
    })
  })
})
