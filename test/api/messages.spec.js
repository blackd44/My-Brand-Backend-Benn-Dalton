import chai from "chai";
import chaiHttp from "chai-http";

const server = 'http://localhost:4444'

export default function testMessages() {
    chai.should()
    chai.use(chaiHttp)

    describe('Testing Messages API', () => {

        describe('GET /api/tasks', () => {
            it('Should get all the messages', done => {
                chai.request(server)
                    .get('/api/messages')
                    .end((e, res) => {
                        res.should.have.status(200)
                    })
                done()
            })
        })

    })
}