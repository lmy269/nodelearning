var request = require('supertest');
var calculator = require('../lib/calculator')

describe('Calculator Test', function(){
	describe('add', function(){
		it('add two positive', function(done){
			var app = calculator();

			request(app)
			.get('/add')
			.query({ left:1, right:5 })
			.expect(200, '15', done);
		})
	})
});