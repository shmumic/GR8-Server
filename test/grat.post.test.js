require('dotenv').config();

const {User} = require("../models/user.model");
const {Grat} = require("../models/grat.model");
const auth = require("../controllers/auth.controller");

const request = require("supertest");
var assert = require('assert');
//var should = require('chai').should();
const app = require("../app").app;
const api = request(app);

describe("api/Grat", function () {
    describe("/POST", () => {

        before((done) => {

            User.deleteMany({}).then(done())

        });
        it("Sanity: should allow to user to send a gratitude", function (done) {

            console.log("starting this tests for real!");
            let username = "testUser1";
            let authMethod = "test" + Math.random() + "@gmail.com";
            let gender = "Genderless";
            user = new User({
                nickName: username,
                authMethod: authMethod,
                gender: gender
            });
            user.save(function (errSavingUser, userAdded) {
                if (errSavingUser) {
                    console.log("error while saving user: ");
                    console.log(errSavingUser);
                    done(errSavingUser);
                } else {
                    userAdded = JSON.parse(JSON.stringify(userAdded)); ///wow
                    let formData = {
                        gratText: "I'm thankfull for my cats",
                        isPublic: true
                    };
                    const goodUserToken = auth.jwtCreateAcessToken({_id: userAdded._id});
                    return api
                        .post("/api/grat/" + userAdded._id)
                        .send(formData)
                        .set({authorization: "token " + goodUserToken, Accept: 'application/json'})
                        .expect(200)
                        .then(function (res) {
                            console.log("##########res#######");
                            //     console.log(res);
                            assert.strictEqual(res.body.userId, userAdded._id);
                            assert.strictEqual(res.body.gratText, formData.gratText);
                            assert.strictEqual(res.body.isPublic, formData.isPublic);
                            console.log("##########re2#######");
                            Promise.resolve(done());
                            console.log("##########re3#######");

                        })

                }

            })


        }).timeout(10000);
        it("should not allow user with invalid JWT token", function (done) {

            console.log("starting this tests for real!");
            let username = "testUser1";
            let authMethod = "test" + Math.random() + "@gmail.com";
            let gender = "Genderless";
            user = new User({
                nickName: username,
                authMethod: authMethod,
                gender: gender
            });
            user.save(function (errSavingUser, userAdded) {
                if (errSavingUser) {
                    console.log("error while saving user: ");
                    console.log(errSavingUser);
                    done(errSavingUser);
                } else {
                    userAdded = JSON.parse(JSON.stringify(userAdded)); ///wow
                    let formData = {
                        gratText: "I'm thankfull for my cats",
                        isPublic: true
                    };
                    const badUserToken = "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzE2NDk1Njd9.4BoFWnVhj1L81fBrKQ1lqNlf5cn5GWsyjdwitpX2mlA";
                    api
                        .post("/api/grat/" + userAdded._id)
                        .send(formData)
                        .set({authorization: "token " + badUserToken, Accept: 'application/json'})
                        .expect(401, done);


                }

            })


        }).timeout(10000);
        it("should not allow user with other users JWT token", function (done) {

            console.log("starting this tests for real!");
            let username = "testUser2";
            let authMethod = "test2" + Math.random() + "@gmail.com";
            let gender = "Genderless";
            let user2 = new User({
                nickName: username,
                googleId: authMethod,
                gender: gender
            });
            user2.save();
            console.log("starting this tests for real!2");

            username = "testUser1";
            authMethod = "test" + Math.random() + "@gmail.com";
            gender = "Genderless";
            user = new User({
                nickName: username,
                googleId: authMethod,
                gender: gender
            });
            console.log("starting this tests for real!3");

            user.save(function (errSavingUser, userAdded) {
                if (errSavingUser) {
                    console.log("error while saving user: ");
                    console.log(errSavingUser);
                    done(errSavingUser);
                } else {
                    userAdded = JSON.parse(JSON.stringify(userAdded)); ///wow
                    let formData = {
                        gratText: "I'm thankfull for my cats",
                        isPublic: true
                    };
                    const badUserToken = auth.jwtCreateAcessToken({_id: user2._id});

                    api
                        .post("/api/grat/" + userAdded._id)
                        .send(formData)
                        .set({authorization: "token " + badUserToken, Accept: 'application/json'})
                        .expect(401, done);

                }

            })


        }).timeout(10000);
        it("Should return error if gratitude lenght is not between 3 to 280 and if isPublic is not supplied", function (done) {


            username = "testUser1";
            authMethod = "test" + Math.random() + "@gmail.com";
            gender = "Genderless";
            user = new User({
                nickName: username,
                googleId: authMethod,
                gender: gender
            });

            user.save(function (errSavingUser, userAdded) {
                if (errSavingUser) {
                    console.log("error while saving user: ");
                    console.log(errSavingUser);
                    done(errSavingUser);
                } else {
                    userAdded = JSON.parse(JSON.stringify(userAdded)); ///wow
                    const goodUserToken = auth.jwtCreateAcessToken({_id: userAdded._id});
                    let formDataTooShort = {
                        gratText: "22",
                        isPublic: true
                    };

                    api
                        .post("/api/grat/" + userAdded._id)
                        .send(formDataTooShort)
                        .set({authorization: "token " + goodUserToken, Accept: 'application/json'})
                        .expect(400);

                    let formDataTooLong = {
                        gratText: "a".repeat(281),
                        isPublic: true
                    };

                    api
                        .post("/api/grat/" + userAdded._id)
                        .send(formDataTooLong)
                        .set({authorization: "token " + goodUserToken, Accept: 'application/json'})
                        .expect(400, done);

                }


            })


        }).timeout(10000);

    })

});


//