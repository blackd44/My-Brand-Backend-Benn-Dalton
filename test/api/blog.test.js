import request from "supertest"
import app from "../../app.js"

let token = undefined
let blogId = undefined

beforeAll(async () => {
    const res = await request(app).post('/api/users/signup').send({
        email: "newemail@test.com",
        username: "newemail",
        password: "Test@123"
    })
    token = res.body.token
})

afterAll(async () => {
    const res = await request(app).delete('/api/users/user').set({
        Authorization: 'Bearer ' + token
    }).send({
        password: "Test@123"
    })
})


describe("\ntesting blogs routes", () => {

    describe("GET api/blogs", () => {
        test('Should return all blogs in an array', async () => {
            const res = await request(app).get('/api/blogs')
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe("POST api/blogs", () => {
        test('Should return the error in posting the blog, because of no title', async () => {
            const res = await request(app).post('/api/blogs')
                .set({
                    Authorization: 'Bearer ' + token
                }).send({
                    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(400)
            expect(typeof res.body).toBe('object')
        })

        test('Should return the 403 for entering the Wrong token', async () => {
            let wrongToken = token.split('')
            wrongToken[0] = 'Z'
            wrongToken = wrongToken.join('')
            const res = await request(app).post('/api/blogs')
                .set({
                    Authorization: 'Bearer ' + wrongToken
                }).send({
                    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com",
                    title: "testing blog post",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(403)
        })

        test('Should return the uploaded Blog', async () => {
            const res = await request(app).post('/api/blogs')
                .set({
                    Authorization: 'Bearer ' + token
                }).send({
                    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com",
                    title: "testing blog post",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(202)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('title', "testing blog post")
            blogId = res.body._id
        })
    })

    describe("GET api/blogs/:id", () => {
        test('Should return the updated Blog', async () => {
            let wrongId = blogId.substring(0, blogId.length - 2)
            const res = await request(app).get('/api/blogs/' + wrongId)
            expect(res.status).toBe(204)
        })

        test('Should return the updated Blog', async () => {
            const res = await request(app).get('/api/blogs/' + blogId)
            expect(res.status).toBe(200)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('title', "testing blog post")
        })
    })

    describe("PATCH api/blogs/:id", () => {
        test('Should return the updated Blog', async () => {
            let wrongId = blogId.substring(0, blogId.length - 2)
            const res = await request(app).patch('/api/blogs/' + wrongId)
                .set({
                    Authorization: 'Bearer ' + token
                }).send({
                    title: "Updated testing blog post",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(204)
        })

        test('Should return the 401 for trying to change unchangable', async () => {
            const res = await request(app).patch('/api/blogs/' + blogId)
                .set({
                    Authorization: 'Bearer ' + token
                }).send({
                    createdAt: new Date(),
                    title: "Updated testing blog post",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(401)
            expect(typeof res.body).toBe('object')
        })

        test('Should return the updated Blog', async () => {
            const res = await request(app).patch('/api/blogs/' + blogId)
                .set({
                    Authorization: 'Bearer ' + token
                }).send({
                    title: "Updated testing blog post",
                    content: "here is the blog again for sure"
                })
            expect(res.status).toBe(202)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('title', "Updated testing blog post")
        })
    })

    describe("DELETE api/blogs/:id", () => {
        test('Should return the deleted Blog', async () => {
            let wrongId = blogId.substring(0, blogId.length - 2)
            const res = await request(app).delete('/api/blogs/' + wrongId)
                .set({
                    Authorization: 'Bearer ' + token
                })
            expect(res.status).toBe(204)
        })

        test('Should return the deleted Blog', async () => {
            const res = await request(app).delete('/api/blogs/' + blogId)
                .set({
                    Authorization: 'Bearer ' + token
                })
            expect(res.status).toBe(202)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('title', "Updated testing blog post")
        })

        test('Should return the deleted Blog', async () => {
            const res = await request(app).delete('/api/blogs/' + blogId)
                .set({
                    Authorization: 'Bearer ' + token
                })
            expect(res.status).toBe(204)
        })
    })
})