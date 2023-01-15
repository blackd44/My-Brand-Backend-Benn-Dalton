import request from 'supertest'
import app from '../../app.js'


describe('\ntesting messages routes', () => {
    let test_id = undefined
    let _test_id = undefined

    // get all messages
    describe('GET api/messages', () => {
        test('should return all messeges in array', async () => {
            const res = await request(app).get('/api/messages')
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
            expect(typeof res.body[0]).toBe('object')
        })
    })

    // Post a messege
    describe('POST api/messages/', () => {
        test('should return the posted message', async () => {
            const res = await request(app).post('/api/messages').send({
                email: "name@email.com",
                content: "This is testing"
            })
            expect(res.statusCode).toBe(201)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('email', "name@email.com")
            expect(res.body).toHaveProperty('content', "This is testing")
            test_id = res.body._id
            _test_id = (test_id + '').split('')
            _test_id[0] = '2'
            _test_id = _test_id.join('')
        })

        test('should return error for unprocessable entiny', async () => {
            const res = await request(app).post('/api/messages').send({
                email: "name.com",
                content: "The"
            })
            expect(res.statusCode).toBe(422)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('error')
        })
    })

    // get one message
    describe('GET api/messages/:id', () => {
        test('should return one messege with id in request url', async () => {
            const res = await request(app).get('/api/messages/' + test_id)
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('email', "name@email.com")
            expect(res.body).toHaveProperty('content', "This is testing")
        })

        test('should return 204 for no content', async () => {
            const res = await request(app).get('/api/messages/' + _test_id)
            expect(res.statusCode).toBe(204)
        })
    })

    // patch a messege
    describe('PATCH api/messages/:id', () => {
        test('should return the updated message', async () => {
            const res = await request(app).patch('/api/messages/' + test_id).send({
                content: "This is second testing"
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('updated')
            expect(typeof res.body.updated).toBe('object')
            expect(res.body.updated).toHaveProperty('email', "name@email.com")
            expect(res.body.updated).toHaveProperty('content', "This is second testing")
        })

        test('should return 204 for no content', async () => {
            const res = await request(app).patch('/api/messages/' + _test_id)
            expect(res.statusCode).toBe(204)
        })
    })

    // delete one message
    describe('DELETE api/messages/:id', () => {
        test('should return the deleted message', async () => {
            const res = await request(app).delete('/api/messages/' + test_id)
            expect(res.statusCode).toBe(202)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('deleted')
            expect(typeof res.body.deleted).toBe('object')
            expect(res.body.deleted).toHaveProperty('_id')
            expect(res.body.deleted).toHaveProperty('email')
            expect(res.body.deleted).toHaveProperty('content')
        })

        test('should return 204 for no content', async () => {
            const res = await request(app).delete('/api/messages/' + test_id)
            expect(res.statusCode).toBe(204)
        })

        test('should return 204 for no content', async () => {
            const res = await request(app).delete('/api/messages/' + _test_id)
            expect(res.statusCode).toBe(204)
        })
    })

})