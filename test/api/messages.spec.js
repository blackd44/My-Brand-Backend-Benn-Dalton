import chai from "chai";
import chaiHttp from "chai-http";

export default function testMessages(server) {
    chai.should()
    chai.use(chaiHttp)

    describe('Testing Messages API', () => {

        describe('GET /api/messages', () => {
            it('Should get all the messages', done => {
                chai.request(server)
                    .get('/api/messages')
                    .end((e, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                    })
                done()
            })
        })

        describe('GET /api/messages/:id', () => {
            it("Should get the message by it's id", done => {
                chai.request(server)
                    .get('/api/messages/63beacc7eac2f6f00167cf4c')
                    .end((e, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('email')
                        res.body.should.have.property('content')
                        res.body.should.have.property('_id')
                        res.body.should.have.property('_id').eq('63beacc7eac2f6f00167cf4c')
                    })
                done()
            })
        })

    })

}