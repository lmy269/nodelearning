var express = require('express');
var db = require('./db')

module.exports = createServer;

function createServer()
{
	var app = express();

	app.map = function(a, route){
	  route = route || '';
	  for (var key in a) {
	    switch (typeof a[key]) {
	      // { '/path': { ... }}
	      case 'object':
	        app.map(a[key], route + key);
	        break;
	      // get: function(){ ... }
	      case 'function':
	        app[key](route, a[key]);
	        break;
	    }
	  }
	};

	var books = {
		get : function(req, res){
			return db.books.get(req, res);
		},
		delete : function(req, res){
			return db.books.delete(req, res);
		},
		put: function(req, res){
			var book = { title: req.params.title, author: req.params.author};
			db.books.push(book);

			res.send(book);
		}
	};

	app.map({
		'/books' : {
			get : books.get,
			delete : books.delete,
			'/author=:author' : {
				get : books.get,
				delete : books.delete,
				'/title=:title' : {
					get : books.get,
					put : books.put,
					delete : books.delete
				}
			}
		}
	});

	return app;
}