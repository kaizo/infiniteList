(function () {
	angular.module("bookList", [])
		.controller("bookListController", ["$scope", "$http", function ($scope, $http) {

			var bookListUrl = "/bookList10000.json";
			var moreItems = 25;
			var booksPageSize = 100;
			var booksStartPosition = 0;
			var booksEndPosition = booksPageSize;
			var books = [];

			$scope.bookSearch = {};
			$scope.propertyName = "";
			$scope.halloween = false;

			function scrollIntoView() {
				var myContainer = $('#mainContainer');
				var scrollTo = $(".top");
				if (!scrollTo.length) {
					markTop();
					scrollIntoView();
					return;
				}

				myContainer.scrollTop(scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop());
			}

			window.addItemsTop = function () {
				$scope.bookList.splice(booksEndPosition - moreItems, moreItems);
				[].splice.apply($scope.bookList, books.slice(booksStartPosition - moreItems, booksStartPosition));
				$scope.$apply();
				booksStartPosition -= moreItems;
				booksEndPosition -= moreItems;
				scrollIntoView();
			};

			window.addItemsBottom = function () {
				$scope.bookList.splice(booksStartPosition, moreItems);
				[].push.apply($scope.bookList, books.slice(booksEndPosition, booksEndPosition + moreItems));
				$scope.$apply();
				booksStartPosition += moreItems;
				booksEndPosition += moreItems;
				scrollIntoView();
			};

			function markTop() {
				var cutoff = $(window).scrollTop();
				$('.item').removeClass('top').each(function () {
					if ($(this).offset().top > cutoff) {
						$(this).addClass('top');
						return false; // stops the iteration after the first one on screen
					}
				});
			}

			$('#mainContainer').scroll(function () {
				markTop();
				if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
					addItemsBottom();
				} else if ($(this).scrollTop() <= 0) {
					addItemsTop()
				}
			});

			//$('#mainContainer').on('scroll', function (a,b,c,d) {
			//	if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
			//		console.log('end reached');
			//	}
			//	else if ($(this).scrollTop() <= 0) {
			//		console.log('Top reached');
			//	}
			//	else {
			//		console.log("AAAAAAAAAA");
			//	}
			//});

			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			function formatDate (date) {
				return ""
					+ days[date.getDay()] + " "
					+ date.getDate() + "/"
					+ (date.getMonth() + 1) + "/"
					+ date.getFullYear();
			}

			$http.get(bookListUrl).then(function (req) {
				req.data.forEach(function (book) {
					book.publishData = formatDate(new Date(book.publishData));
				});
				console.log(req.data.length);
				books = req.data;
				$scope.bookList = req.data.slice(booksStartPosition, booksEndPosition);
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
