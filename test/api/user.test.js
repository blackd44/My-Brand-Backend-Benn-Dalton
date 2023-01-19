import request from "supertest";
import app from "../../app.js";

describe('\ntesting users routes', () => {
    let token = undefined
    describe('POST api/users/signup', () => {
        test('should return the token of user who created account', async () => {
            const res = await request(app).post('/api/users/signup').send({
                email: "email@test.com",
                username: "testing1",
                password: "Test@123"
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for the account existing', async () => {
            const res = await request(app).post('/api/users/signup').send({
                email: "email@test.com",
                username: "testing1",
                password: "Test@123"
            })
            expect(res.statusCode).toBe(400)
        })

        test('should return 400 for entering not good request', async () => {
            const res = await request(app).post('/api/users/signup').send({
                username: "NEW1",
                password: "Test@123"
            })
            expect(res.statusCode).toBe(400)
        })
    })

    describe('POST api/users/login', () => {
        test('should return the token of user who logged account', async () => {
            const res = await request(app).post('/api/users/login').send({
                email: "email@test.com",
                password: "Test@123"
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
            token = res.body.token
        })

        test('should return 401 for entering unexist email', async () => {
            const res = await request(app).post('/api/users/login').send({
                email: "emailnotin@test.com",
                password: "Test@123"
            })
            expect(res.statusCode).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for entering bad request', async () => {
            const res = await request(app).post('/api/users/login').send({
                email: "emailnotin@test.com"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })
    })

    describe('GET api/users/user', () => {
        test('should return user info', async () => {
            const res = await request(app).get('/api/users/user').set({
                Authorization: 'Bearer ' + token
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
        })

        test('should return 401 for not having token', async () => {
            const res = await request(app).get('/api/users/user').set({
                Authorization: 'Bearer ' + ''
            })
            expect(res.statusCode).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('should return 500 for invalid token', async () => {
            let invalid = '' + token
            invalid = invalid.substring(0, invalid.length - 2)
            const res = await request(app).get('/api/users/user').set({
                Authorization: 'Bearer ' + invalid
            })
            expect(res.statusCode).toBe(500)
        })
    })

    describe('DELETE api/users/user', () => {
        test('should return 401 for not having token', async () => {
            const res = await request(app).delete('/api/users/user').set({
                Authorization: 'Bearer ' + ""
            }).send({
                password: "Test@123"
            })
            expect(res.statusCode).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for not have password', async () => {
            const res = await request(app).delete('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({})
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('should return 401 for incorrect password', async () => {
            const res = await request(app).delete('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                password: "Test2@122"
            })
            expect(res.statusCode).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('should return the terminated users', async () => {
            const res = await request(app).delete('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                password: "Test@123"
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
        })
    })
})