module.exports = createServer

function createServer()
{
	var express = require('express')

	var app = express();

	app.get('/add', function(req, res, next) {
		var left = req.query.left;
		var right = req.query.right;

		res.send(left + right);
	});

	return app;
}