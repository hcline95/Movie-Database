let chai = require('chai');
let chaiHttp = require('chai-http');
let { server } = require('../../server/index');
chai.use(chaiHttp);
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
let should = chai.should();


//testing home page route
describe('/GET movies', () => {
    it('it should GET all the movies', done => {
        chai
            .request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
});

//testing search bar route
describe('/GET movies from search term', () => {
    it('it should GET the movies results when type is movie and search is acceptable', done => {
        chai
            .request(server)
            .get('/search?type=movie&search=Shawshank Redemption')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
    it('it should GET the movies results when type is person and search is acceptable', done => {
        chai
            .request(server)
            .get('/search?type=person&search=Tom Hanks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
    it('it should not GET the movies results when type is person and search is empty', done => {
        chai
            .request(server)
            .get('/search?type=person')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('it should not GET the movies results when type is movie and search is empty', done => {
        chai
            .request(server)
            .get('/search?type=movie')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('it should not GET the movies results when actors name cannot be found', done => {
        chai
            .request(server)
            .get('/search?type=person&search=jsdklfjs')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

//testing movie credits route
describe('/GET credits by movie id', () => {
    it('it should GET credits ', done => {
        chai
            .request(server)
            .get('/38700')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
    it('it should not GET credits if ID is invalid', done => {
        chai
            .request(server)
            .get('/38a00')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('it should not GET credits if ID is cannot be found', done => {
        chai
            .request(server)
            .get('/73852093485034985')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});