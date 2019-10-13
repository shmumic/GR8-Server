require('dotenv').config();
const config = require("../config");
config.dbName = config.dbTestName;
//config.dbURI = config.dbTestRemoteURI;
const {User} = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
var should = require('chai').should();
const app = require("../app").app;
const api = request(app);

describe("POST /", () => {
    beforeEach(
        function (done) {
            User.deleteMany({}, function (err, done) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    return done;
                }

            }).then(done())
        });
    it("should return user when the all request body is valid", function (done) {
        console.log(1);
        api.post("/api/users")
            .send({
                name: "test",
                authMethod: "test@gmail.com",
                gender: "male"
            }).end(function (err, res) {
            if (err) throw  err;
            console.log(5);

            console.log("sending post request to server");
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name", "test");
            expect(res.body).to.have.property("authMethod", "test@gmail.com");
            expect(res.body).to.have.property("gender", "male");
            console.log(6);
            done();


        })

    })
});

