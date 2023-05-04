const { default: axios } = require('axios');
const { app, PORT } = require('../index');
const request = require('supertest')
// const axios = require('axios');



//capsules test
describe('GET /capsules/*', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/capsules')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });

    it('Serial Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/capsules/serial/C103')
            .then(function(response) {
                let serialValue = response.data.capsule.serial;
                expect(Boolean(serialValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Capsule Length should return FALSE as a boolean', () => {
        axios.get('http://localhost:8000/capsules/serial/C99')
            .then(function (response) {
                console.log("Response =>", response.data);
                expect(response.data.message).toBe('Capsule not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
});

describe('GET /company', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/company')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });

    
});


describe('GET /cores', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/cores')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /crew', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/crew')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /dragons/*', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/dragons')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
    it('id Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/dragons/')
            .then(function(response) {
                let idValue = response.data.dragon.id;
                expect(Boolean(idValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Dragons Length should return FALSE as a boolean', () => {
        axios.get('http://localhost:8000/dragons')
            .then(function (response) {
                console.log("Response =>", response.data);
                expect(response.data.message).toBe('Dragon not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});

describe('GET /landpads/*', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/landpads')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });

    it('id Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/landpads/type/RTLS')
            .then(function(response) {
                let idValue = response.data.landpads[0].type;
                expect(Boolean(idValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Landpads Length should return FALSE as a boolean', () => {
        axios.get('http://localhost:8000/landpads/type/capsules')
            .then(function (response) {
                console.log("Response =>", response.data);
                expect(response.data.message).toBe('Landpads not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    
});

describe('GET /launches', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/launches')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /launchpads', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/launchpads')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
    it('id Value should return TRUE as a boolean', () => {
        axios.get('http://localhost:8000/launchpads/')
            .then(function(response) {
                let idValue = response.data.launchpads.type;
                expect(Boolean(idValue)).toBe(true);
            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });
    it('Launchpads Length should return FALSE as a boolean', () => {
        axios.get('http://localhost:8000/launchpads')
            .then(function (response) {
                console.log("Response =>", response.data);
                expect(response.data.message).toBe('Launchpads not found, Please try again')

            })
            .catch(function (error) {
                console.log('error here', error);
            })
    });

});

describe('GET /payloads', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/payloads')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /roadster', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/roadster')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /rockets', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/rockets')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /ships', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/ships')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /starlink', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/starlink')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});

describe('GET /history', function() {
    it('respond with 200', function (done) {
        request(app)
        .get('/history')
        .expect(200, done)
    });
    it('should respond with json', () => {
        request(app)
        .get('/')
        .set('Accept','application/json' )
        .expect('Content-Type', /json/)
        // .expect(200, done);

    });
});










