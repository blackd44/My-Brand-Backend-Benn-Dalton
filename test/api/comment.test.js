import request from "supertest";
import app from '../../app.js'

let usertoken = undefined
let blogId = undefined
let commentId = undefined

beforeAll(async () => {
    const user = await request(app).post('/api/users/signup').send({
        email: "newuser@test.com",
        username: "newuser",
        password: "Test@123"
    })
    usertoken = user.body.token

    const blog = await request(app).post('/api/blogs')
        .set({
            Authorization: 'Bearer ' + usertoken
        }).send({
            image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80secondemail@email.com",
            title: "testing blog post",
            content: "here is the blog again for sure"
        })
    blogId = blog.body._id
})

afterAll(async () => {
    const blog = await request(app).delete('/api/blogs/' + blogId)
        .set({
            Authorization: 'Bearer ' + usertoken
        })

    const user = await request(app).delete('/api/users/user')
        .set({
            Authorization: 'Bearer ' + usertoken
        }).send({
            password: "Test@123"
        })
})

describe('testing all comment routes', () => {
    test('should return the blog', async () => {
        const res = await request(app).get('/api/blogs/' + blogId)
        expect(res.status).toBe(200)
    });

    describe('GET /:blogId/comments/', () => {
        test('should return all comments of a blog', async () => {
            const res = await request(app).get('/api/blogs/' + blogId + '/comments/')
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('values')
            expect(Array.isArray(res.body.values)).toBe(true)
        })
    })

    describe('POST /:blogId/comments/', () => {

        test('should return 400 status for wrong message', async () => {
            const res = await request(app).post('/api/blogs/' + blogId + '/comments/')
                .set({
                    Authorization: 'Bearer ' + usertoken
                })
                .send({})
            expect(res.status).toBe(400)
        });

        test('should return the posted comment and all comments of a blog', async () => {
            const res = await request(app).post('/api/blogs/' + blogId + '/comments/')
                .set({
                    Authorization: 'Bearer ' + usertoken
                })
                .send({
                    message: 'testing comment'
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('comment')
            expect(res.body).toHaveProperty('comments')
            expect(Array.isArray(res.body.comments)).toBe(true)

            expect(res.body.comment).toHaveProperty('_id')
            commentId = res.body.comment._id
        })
    })

    describe('POST /:commentId/reply/', () => {

        test('should return the posted reply and all it\'s comment of a comment', async () => {
            const res = await request(app).post('/api/blogs/' + commentId + '/reply/')
                .set({
                    Authorization: 'Bearer ' + usertoken
                })
                .send({
                    message: 'testing reply'
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('reply')
            expect(res.body).toHaveProperty('comment')
            expect(typeof res.body.comment).toBe('object')
        })
    })
});