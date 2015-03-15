var books = exports.books = {};
var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost','test'); 

var Book = db.model('book', {
	author :  String,
	title : String
});

db.on('error',console.error.bind(console,'Connection Error:'));
db.once('open',function(){
  console.log('Connected!');
});

books.push = function(obj)
{
	var bookEntity = new Book({title : obj.title, author : obj.author});
	console.log(bookEntity.author);

	bookEntity.save(function (err) {
	  if (err) {
	  	console.log('meow');
	  }
	  else
	  {
	  	console.log(err);
	  }
	});
}

books.delete = function(req, res)
{
	var query = parseQuery(req);
	
	Book.remove(query, function(err) {
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send('Remove succeeded!')
		}
	});
}

books.get = function(req, res)
{
	var query = parseQuery(req);

	Book.find(query, {'author' : 1, 'title' : 1}, function(err, bookEntities) {
		res.send(bookEntities);
	});
}

function parseQuery(req)
{
	var query = {}

	if(req.params.author)
	{
		query['author'] = req.params.author;
	}
	if(req.params.title)
	{
		query['title'] = req.params.title;
	}

	return query;
}