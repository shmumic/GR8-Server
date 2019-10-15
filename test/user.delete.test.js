require('dotenv').config();

const {User} = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
var should = require('chai').should();
const app = require("../app").app;
const api = request(app);

describe("api/users", function () {
    describe("/delete:id", () => {

        before((done) => {

            console.log("strating to run test...");

            User.deleteMany({}).then(done())

        });
        it("Sanity: should delete a user if a valid is request provided", function (done) {
            //adds two users deletes only one of them.
            let username = "testUser1";
            let authMethod = "test" + Math.random() + "@gmail.com";
            let gender = "Genderless";
            let user = new User({
                nickName: username,
                authMethod: authMethod,
                gender: gender
            });
            username = "testUser2";
            authMethod = "test" + Math.random() + "@gmail.com";
            gender = "Genderless";
            let user2 = new User({
                nickName: username,
                authMethod: authMethod,
                gender: gender
            });
            user2.save();
            user.save(function (errSavingUser, userAdded) {
                if (errSavingUser) {
                    console.log("error while saving user: ");
                    console.log(errSavingUser);
                    done(errSavingUser);
                } else {
                    userAdded = JSON.parse(JSON.stringify(userAdded));
                    api
                        .delete("/api/users/" + userAdded._id)
                        .set('Accept', 'application/json')
                        .expect(function () {
                            // expect(user).to.equal(userAdded._id);
                            User.findById(userAdded._id, (errFindingUser, foundUser1) => {
                                if (errFindingUser) {
                                    console.log(errFindingUser)
                                } else {

                                    foundUser1 = JSON.parse(JSON.stringify(foundUser1));
                                    expect(foundUser1).to.equal(null);
                                }
                            });

                            User.findById(user2._id, (errFindingUser, foundUser2) => {
                                if (errFindingUser) {
                                    console.log(errFindingUser)
                                } else {
                                    foundUser2 = JSON.parse(JSON.stringify(foundUser2));
                                    user2 = JSON.parse(JSON.stringify(user2));
                                    //console.log(foundUser2)
                                    expect(foundUser2._id).to.equal(user2._id);
                                    expect(foundUser2.nickName).to.equal(user2.nickName);
                                    expect(foundUser2.authMethod).to.equal(user2.authMethod);
                                    expect(foundUser2.gender).to.equal(user2.gender);
                                }
                            })


                        })
                        .expect(function (res) {

                            expect(res.body).to.deep.equal({});
                        })
                        .expect(200, done);

                }

            })


        }).timeout(10000);
        //TODO Add a test that verifies user's gratitudes were deleted as well.

    })

});



