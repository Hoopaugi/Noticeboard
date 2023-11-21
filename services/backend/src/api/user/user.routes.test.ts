import request from 'supertest'

import app from '../../app'
import db from '../../test/db'

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe('user.routes', () => {
  describe('POST /api/users/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('New user can be created', async () => {
      const data = {
        'username': 'tester',
        'password': 'secret'
      }

      const res = await request(app).post('/api/users').send(data)
  
      expect(res.statusCode).toBe(201)

      expect(res.body.id).toBeDefined()
      expect(res.body.username).toBe(data.username)
      expect(res.body.password).not.toBeDefined()
      expect(res.body.passwordHash).not.toBeDefined()

      expect(res.body._id).not.toBeDefined()
      expect(res.body.__v).not.toBeDefined()
    })

    test('User with invalid parameters is rejected', async () => {
      const userNoUsername = {
        'password': 'secret'
      }

      let res = await request(app).post('/api/users').send(userNoUsername)
  
      expect(res.statusCode).toBe(400)

      expect(res.body.message).toBe('missing username')

      const userNoPassword = {
        'username': 'tester'
      }

      res = await request(app).post('/api/users').send(userNoPassword)
  
      expect(res.statusCode).toBe(400)

      expect(res.body.message).toBe('missing password')
    })
  })
})
