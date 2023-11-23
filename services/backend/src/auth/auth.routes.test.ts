import request from 'supertest'

import app from '../app'
import db from '../test/db'
import seeds from '../test/seeds.json'

beforeAll(async () => {
  await db.connect()
})

afterAll(async () => {
  await db.disconnect()
})

describe('auth.routes', () => {
  describe('POST /auth/login/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('Login succeeds with valid credentials', async () => {
      const credentials = seeds.users[0]

      const res = await request(app).post('/auth/login').send(credentials)
  
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toContain('application/json')

      expect(res.body.token).toBeDefined()
      expect(res.body.username).toBe(credentials.username)
    })

    test('Login fails with invalid credentials', async () => {
      const credentials = { username: seeds.users[0].username, password: 'invalidPassword' }
      
      const res = await request(app).post('/auth/login').send(credentials)
  
      expect(res.statusCode).toBe(400)
      expect(res.headers['content-type']).toContain('application/json')

      expect(res.body.token).not.toBeDefined()
      expect(res.body.username).not.toBe(credentials.username)
    })
  })

  describe('GET /auth/me/', () => {
    beforeEach(async () => {
      await db.seed()
    })

    afterEach(async () => {
      await db.clear()
    })

    test('Fails without authorization', async () => {
      const res = await request(app).get('/auth/me')
  
      expect(res.statusCode).toBe(400)
      expect(res.headers['content-type']).toContain('application/json')

      expect(res.body.message).toBe('invalid or missing authorization header')
    })

    test('Succeeds with valid token', async () => {
      const credentials = seeds.users[0]

      let res = await request(app).post('/auth/login').send(credentials)

      const token = res.body.token

      res = await request(app).get('/auth/me').set('authorization', `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toContain('application/json')

      expect(res.body.username).toBe(credentials.username)
    })
  })
})
