require('dotenv').config()
var config = require("../config");
config.dbName = config.dbTestName;
config.dbURI = config.dbTestRemoteURI;

const { User } = require("../models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const assert = require("chai").assert;
var should = require('chai').should();
const app = require("../app").app;

var api = request(app);
describe("api/users",()=>{
  beforeEach(async()=>{
    await User.deleteMany({});//clear the data base before each test
  });
  describe("/GET:id",()=>{
    it("should return a user if a valid is provided",async()=>{
      //insert user to db
      let username = "testUser1";
      let authMethod = "test@gmail.com";
      let gender = "Genderless";
      const user = new User({
        name:username,
        authMethod:authMethod,
        gender:gender
      })
      await user.save().then(User.find({},function(err,foundUser){
        if(err) console.log(err)
        else console.log(foundUser);

      }));

    //first test whether data was correctly entered to the db.

    assert.isOk(user.name,username,"username was not entered correctly to the db cannot perform test")
    assert.isOk(user.gender,gender,"gender was not entered correctly to the db cannot perform test")
    assert.isOk(user.authMethod,authMethod,"authMethod was not entered correctly to the db cannot perform test")
//check if API returns the correct status code and user details.
    const res = await api.get("/api/users/" + user._id);
    console.log("resbody:" + res.body)
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name",user.name)
    expect(res.body).to.have.property("authMethod",user.authMethod)
    expect(res.body).to.have.property("gender",user.gender)
  })
  })
})
