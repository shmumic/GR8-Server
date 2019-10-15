require('dotenv').config();

const {User} = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
var should = require('chai').should();
const app = require("../app").app;
const api = request(app);

describe("api/users", function () {
    describe("/GET:id", () => {

        before((done) => {

            User.deleteMany({}).then(done())

        });
        it("Sanity: should return a user if a valid is request provided", function (done) {

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

                    api
                        .get("/api/users/" + userAdded._id)
                        .set('Accept', 'application/json')
                        .expect(function (res) {
                            console.log(res.body);
                            expect(res.body._id).to.equal(userAdded._id);
                            expect(res.body.nickName).to.equal(userAdded.nickName);
                            expect(res.body.authMethod).to.equal(userAdded.authMethod);
                            expect(res.body.gender).to.equal(userAdded.gender);

                        })
                        .expect(200, done);

                }

            })


        }).timeout(10000);

    })

});



