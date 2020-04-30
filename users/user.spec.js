const db = require("../database/dbConfig.js");
const Users = require("../users/user-model.js");

const request = require("supertest");
const server = require("../api/server.js");


describe('users router', () => {
    describe('test environment', function () {
        it('should use the staging environment', function () {
            expect(process.env.NODE_ENV).toBe('staging');
        })
    })

    describe('GET /api/users/:id/fav-reviews', function () {
        let token = {};

        it('should login the user', function (done) {
            request(server)
                .post('/api/auth/login')
                .send({ email: "test@email.com", password: "pass" })
                .expect(200)
                .end(onResponse);
            function onResponse(err, res) {
                token = res.body.token;
                return done();
            }
        });

        it('should require authorization', function () {

            return request(server)
                .get('/api/users')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo4LCJ1c2VybmFt')
                .expect(401);
        });
    });

    describe('insert()', function () {
        // it('should add the created review', () => {
        //     Users.addReview({
        //         strain: "pineapple express",
        //         stars: 3,
        //         review: "not as good as the movie",
        //         user_id: 1
        //     });

        //     const reviews = db('reviews');
        //     expect(reviews).toBe(reviews + 1);

        // })
        it('should require authorization', function () {

            return request(server)
                .get('/api/users')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo4LCJ1c2VybmFt')
                .expect(401);
        });
    })


    describe('update()', function () {
        const changes = {
            strain: "bubba kush",
            stars: 4,
            review: "pretty, pretty, pretty good"
        };
        const reviewId = 4;
        it('should update the users review', () => {
            console.log(changes, reviewId);
            Users.updateReview(changes, reviewId)
                .then(updated => {
                    console.log('updated', updated);
                    expect(200);
                })
        });
    });

    describe('delete()', function () {
        const reviewId = 4;

        it('should delete the user\'s review', () => {
            Users.deleteReview(reviewId)
                .then(() => {
                    expect(200);
                })
        })
    });

    describe('GET /api/users', function () {
        let auth = {};
        beforeAll((done) => {

            request(server)
                .post('/api/auth/register')
                .send({ email: "tester@email.com", name: "tester", password: "pass" })
                .expect(200)
                .end(onResponse);

            function onResponse(err, res) {
                console.log(res.body.token);

                auth.token = res.body.token;
                return done();
            }
        })

        it('should require authorization', function () {

            return request(server)
                .get('/api/users')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo4LCJ1c2VybmFt')
                .expect(401);
        });
    })
})
