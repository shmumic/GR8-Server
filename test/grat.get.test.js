require('dotenv').config();

const {User} = require("../models/user.model");
const {Grat} = require("../models/grat.model");

const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
var should = require('chai').should();
const app = require("../app").app;
const api = request(app);
var moment = require('moment');
const auth = require("../controllers/auth.controller");

describe("api/Grat", function () {
    describe("/GET", () => {

        before((done) => {

            User.deleteMany({}).then(done())

        });
        it("Sanity: should return a all gratitudes", function (done) {
//this test creates a user and adds two gratitdues
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
                    let newGrat = new Grat({
                        userId: userAdded._id,
                        ip: "192.168.1.1",
                        userAgent: "req.useragent",
                        location: {},
                        gratText: "I'm grateful for writing this test ",
                        isPublic: true,
                        canVisibilityBeChanged: true,
                        publishedDate: moment(),
                        expireDate: moment().add(1, 'days')

                    });
                    let newGrat2 = new Grat({
                        userId: userAdded._id,
                        ip: "192.168.1.1",
                        userAgent: "req.useragent",
                        location: {},
                        gratText: "I'm grateful for and delighted by the music playing in my earphones",
                        isPublic: true,
                        canVisibilityBeChanged: true,
                        publishedDate: moment(),
                        expireDate: moment().add(1, 'days')

                    });


                    newGrat.save();
                    const goodUserToken = auth.jwtCreateAcessToken({_id: userAdded._id});
                    newGrat2.save(function (errSavingGrat) {
                        if (errSavingGrat) {
                            console.log("error saving grat!" + errSavingGrat)
                        } else {

                            api
                                .get("/api/grat/" + userAdded._id)
                                .set({authorization: "token " + goodUserToken, Accept: 'application/json'})
                                .expect(200)
                                .then(function (res) {
                                    console.log("body!:" + res.body);
                                    console.log("body!:" + res.body[1][1]);

                                    assert.strictEqual(res.body.userId, userAdded._id);
                                    assert.strictEqual(res.body.gratText, formData.gratText);
                                    assert.strictEqual(res.body.isPublic, formData.isPublic);
                                    Promise.resolve(done());

                                })
                        }
                    })


                }

            })


        }).timeout(10000);

    })

});



