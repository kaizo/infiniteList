(function () {
    "use strict";
	angular.module("bookList", [])
		.controller("bookListController", ["$scope", "$http", function ($scope, $http) {

			var bookListUrl = "/bookList10000.json";
            var loadedBooks = 200;
			var moreItems = 25;

			var books = [];

			$scope.bookSearch = {};
			$scope.propertyName = "";
			$scope.halloween = false;

			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			function formatDate (date) {
				return ""
					+ days[date.getDay()] + " "
					+ date.getDate() + "/"
					+ (date.getMonth() + 1) + "/"
					+ date.getFullYear();
			}

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

			$http.get(bookListUrl).then(function (req) {
				req.data.forEach(function (book) {
					book.publishData = formatDate(new Date(book.publishData));
                    book.author.gender = capitalizeFirstLetter(book.author.gender);
				});
				console.log("Obtained list length: ", req.data.length);
				books = req.data;
                var infiniteScroller = new InfiniteScroller($scope, loadedBooks, moreItems, req.data);
                infiniteScroller.start();
                window.infiniteScroller = infiniteScroller; // debug purposes
			});

			$scope.horrorHalloween = function () {
				if ($scope.halloween) {
					$scope.bookSearch.genre = "Horror";
					$scope.bookSearch.publishData = "31/10";
				} else {
					$scope.bookSearch.genre = "";
					$scope.bookSearch.publishData = "";
				}
			};

			$scope.filterBooks = function (book, search) {
				return !search || book.indexOf(search) > -1;
			};

			$scope.sortBy = function (propertyName) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
				$scope.propertyName = propertyName;
			};

			$scope.genreList = [
				"Action and Adventure",
				"Anthology",
				"Art",
				"Autobiographies",
				"Biographies",
				"Children's",
				"Comics",
				"Cookbooks",
				"Diaries",
				"Dictionaries",
				"Drama",
				"Encyclopedias",
				"Fantasy",
				"Finance",
				"Guide",
				"Health",
				"History",
				"Horror",
				"Journals",
				"Math",
				"Mystery",
				"Poetry",
				"Prayer books",
				"Religion, Spirituality & New Age",
				"Romance",
				"Satire",
				"Science",
				"Science fiction",
				"Self help",
				"Series",
				"Travel",
				"Trilogy"
			];

		}]);
})();
