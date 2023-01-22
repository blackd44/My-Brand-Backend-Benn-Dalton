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

    describe('GET api/users/:email', () => {
        test('should return user info', async () => {
            let email = 'email@test.com'
            const res = await request(app).get('/api/users/' + email)
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
        })

        test('should return 204 for unknown user', async () => {
            let email = 'unknownemail@test.com'
            const res = await request(app).get('/api/users/' + email)
            expect(res.statusCode).toBe(204)
        })
    })

    describe('DELETE api/users/:email', () => {
        let delToken = undefined
        let email = undefined

        test('should return the token of user who logged account', async () => {
            const res = await request(app).post('/api/users/login').send({
                email: "test3@email.com",
                password: "123@Pass2"
            })
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
            delToken = res.body.token
        })

        test('should return the token of user who created account', async () => {
            const res = await request(app).post('/api/users/signup').send({
                email: "test@email.com",
                username: "username",
                password: "Benn@123"
            })
            email = 'test@email.com'
            expect(res.statusCode).toBe(200)
            expect(typeof res.body).toBe('object')
        })

        test('should return the deleted user', async () => {
            const res = await request(app).delete('/api/users/' + email).set({
                Authorization: 'Bearer ' + delToken
            }).send({
                password: "123@Pass"
            })
            expect(res.statusCode).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('should return the deleted user', async () => {
            const res = await request(app).delete('/api/users/' + email).set({
                Authorization: 'Bearer ' + delToken
            }).send({
                password: "123@Pass2"
            })
            console.log(res.body)
            expect(res.statusCode).toBe(202)
            expect(typeof res.body).toBe('object')
        })

        test('should return the deleted user', async () => {
            const res = await request(app).delete('/api/users/' + email).set({
                Authorization: 'Bearer ' + delToken
            }).send({
                password: "123@Pass2"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })
    })

    describe('PATCH api/users/user', () => {
        test('should return 400 for putting username that exists', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                username: "test"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for trying to change email', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                email: "secondemail@email.com"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('should return 500 for invalid token', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + token.substring(0, token.length - 2)
            }).send({
                profile: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com"
            })
            expect(res.statusCode).toBe(500)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for not recorginezed user', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbGV0ZXRlc3QiLCJpYXQiOjE2NzQzOTMyNzl9.yJ1RcAZ-JWoRqVOkZ27-n2k7OwXzzforZEnNZfXnhOs"
            }).send({
                profile: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('should return 400 for not valid value', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                password: "123"
            })
            expect(res.statusCode).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('should return the updated user with new token', async () => {
            const res = await request(app).patch('/api/users/user').set({
                Authorization: 'Bearer ' + token
            }).send({
                profile: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com"
            })
            expect(res.statusCode).toBe(202)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('user')
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
            expect(res.statusCode).toBe(202)
            expect(typeof res.body).toBe('object')
        })
    })
})