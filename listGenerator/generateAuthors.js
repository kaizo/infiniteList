var http = require('http');
var async = require('async');
var jsonfile = require('jsonfile');

var maxListLength = 1000000;
var file = './authorList.json';

var authorList = [];
var parallelRequests = [];

for (var i = 0; i < maxListLength/500; i++) {
	parallelRequests.push(obtain500AuthorNames);
}

async.parallel(parallelRequests, function (err) {
	if (err) {
		console.log("Sorry!", err);
	}

	jsonfile.writeFile(file, authorList, function (err) {
		console.error(err)
	});
});

var aux = 0;
function obtain500AuthorNames(callback) {
	http.get('http://uinames.com/api/?amount=500', function (res) {
		var body = '';

		res.on('data', function (chunk) {
			body += chunk;
		});

		res.on('end', function () {
			authorList = authorList.concat(JSON.parse(body));
			console.log("DONE!", aux++);
			callback();
		});
	}).on('error', function (e) {
		console.log("Got an error: ", e);
	});
}
