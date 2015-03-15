var request = require('supertest');
var bookStore = require('../lib/bookStore');
var db = require('../lib/db');

describe('BookStore Tests', function(){
	describe('List Books Tests', function(){
		it('List all books', function(done){
			var app = bookStore();

			request(app)
			.get('/books')
			.expect(200, db.books, done);
		})
	})
});