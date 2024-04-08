const app       = require("../index")
const chai      = require("chai")
const should    = require("chai").should()
const assert    = require('chai').assert
const expect    = require('chai').expect
const chaiHttp  = require("chai-http")
const path      = require("path")
const fs        = require("fs")
const sinon     = require('sinon')

const log       = console.log

chai.use(chaiHttp)

let rawdataTesting       = fs.readFileSync(path.resolve(__dirname, '../test-environment.json'))

let TESTING_ENVIRONMENT  = JSON.parse(rawdataTesting)

describe("Server configuration", () => {
    describe("Test Environment", () => {
    it("Correct Port", done => {
        assert.equal(app.locals.settings.port, TESTING_ENVIRONMENT.PORT, 'Port should be')
        done()
        })
    it("Correct Environment", done => {
        assert.equal(app.locals.settings.loc_env, TESTING_ENVIRONMENT.LOC_ENV, 'Environment should be')
        done()
        })
    })    
})

describe("Basic Connection", () => {
	it("Call to /test", done => {
		chai
		.request(app)
		.get("/test")
		.end((err, res) => {
			expect(res).to.have.status(200)
			expect(res.body.status).to.equals("success")
			expect(res.body.message).to.equals("Welcome To Testing API")
			done()
		})
	})
})

describe("Scenario: INTEGRATION TEST Error url cannot be found", () => {
	it("GIVEN and error url", done => {
		chai
		.request(app)
		.get("/*")
		.end((err,res) => {
			done()
		})
	})

	it("WHEN obtaining a 404 error code", done => {
		chai
		.request(app)
		.get("/*")
		.end((err,res) => {
			expect(res).to.have.property("status")
			done()
		})
	})

	it("THEN the result is URL does not exist message", done => {
		chai
		.request(app)
		.get("/*")
		.end((err,res) => {
			expect(res).to.have.status(404)
			done()
		})
	})
})

describe("Scenario: UNIT Test a json call not found", () => {
	it("GIVEN a url that uses req.accepts('json')", done => {
		chai
		.request(app)
		.get("/*")
		.set('Accept', 'application/json')
		.end((err,res) => {
			done()
		})
	})

	it("THEN obtaining an error", done => {
		chai
		.request(app)
		.get("/*")
		.set('Accept', 'application/json')
		.end((err,res) => {
			done()
		})
	})
})