var randomWords = require('random-words');
var jsonfile = require('jsonfile');

var maxListLength = 1000000;
var authorFile = './authorList.json';
var file = './bookList.json';
var list = [];

jsonfile.readFile(authorFile, function (err, obj) {
	if (err) {
		console.log(err);
		return;
	}
	generateBookList(obj);
});

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateBookList (authorList) {
	var author;
	for (var i = 0; i < maxListLength; i++) {
		author = authorList[i];
		list.push({
			name: capitalizeFirstLetter(randomWords({min: 3, max: 10, join: ' '})),
			author: {
				name: author.name + " " + author.surname,
				gender: author.gender
			},
			genre: genreList[Math.floor(Math.random() * genreListLength)],
			publishData: randomDate(new Date(1980, 0, 1), new Date())
		});
	}

	jsonfile.writeFile(file, list, function (err) {
		console.error(err)
	});
}

var genreList = [
	"Science fiction",
	"Satire",
	"Drama",
	"Action and Adventure",
	"Romance",
	"Mystery",
	"Horror",
	"Self help",
	"Health",
	"Guide",
	"Travel",
	"Children's",
	"Religion, Spirituality & New Age",
	"Science",
	"History",
	"Math",
	"Anthology",
	"Poetry",
	"Encyclopedias",
	"Dictionaries",
	"Comics",
	"Art",
	"Cookbooks",
	"Diaries",
	"Journals",
	"Prayer books",
	"Series",
	"Trilogy",
	"Biographies",
	"Autobiographies",
	"Fantasy",
	"Finance"
];

var genreListLength = genreList.length;
