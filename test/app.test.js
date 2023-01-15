import request from 'supertest'
import app from '../app.js'

describe('\nWhole application', () => {
    describe('Should return 404 status for Page not Found when', () => {
        test('GET unsupportedlink/unsupportedsublink', async () => {
            const res = await request(app).get('/unsupportedlink/unsupportedsublink')
            expect(res.statusCode).toBe(404)
        })

        test('POST unsupportedlink/unsupportedsublink', async () => {
            const res = await request(app).post('/unsupportedlink/unsupportedsublink').send({})
            expect(res.statusCode).toBe(404)
        })
    })
})