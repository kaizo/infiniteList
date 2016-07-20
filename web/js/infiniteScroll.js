(function () {
    "use strict";
    function InfiniteScroller ($scope, loadedItems, increment, items) {
        this.loadedItems = loadedItems;
        this.increment = increment; // items added and removed when scrolling
        this.startPosition = 0;
        this.endPosition = loadedItems;
        this.items = items;
        this.$scope = $scope;
    }

    // scroll to the item that was tagged as the one on the top.
    InfiniteScroller.prototype.scrollIntoView = function () {
        var scrollTo = $(".top");
        if (!scrollTo.length) {
            this.markTop();
            scrollTo = $(".top");
        }

        var myContainer = $('#mainContainer');
        myContainer.scrollTop(scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop());
    };

    // Add items to the list
    InfiniteScroller.prototype.addItemsToScope = function () {
        this.$scope.bookList = this.items.slice(this.startPosition, this.endPosition);
        this.$scope.$apply();
        if (this.startPosition) {
            this.scrollIntoView();
        }

    }

    // Calculate the new positions that will be shown applying an increment.
    InfiniteScroller.prototype.calculateNewPositions = function (increment) {
        if (this.items.length < this.loadedItems) {
            this.startPosition = 0;
            this.endPosition = this.items.length;
        } else {
            this.startPosition += increment;

            if (this.startPosition < 0) {
                this.startPosition = 0;
            }

            this.endPosition = this.startPosition + this.loadedItems;

            if (this.endPosition > this.items.length) {
                this.endPosition = this.items.length;
                this.startPosition = this.items.length - this.loadedItems;
            }
        }
    };

    // Update list when reached the top of the list
    InfiniteScroller.prototype.topReached = function () {
        this.calculateNewPositions(-this.increment);
        this.addItemsToScope();
    };

    // Update list when reached the bottom of the list
    InfiniteScroller.prototype.bottomReached = function () {
        this.calculateNewPositions(this.increment);
        this.addItemsToScope();
    };

    // Mark the first item to be fully visible
    InfiniteScroller.prototype.markTop = function () {
        var cutoff = $(window).scrollTop();
        $('.item').removeClass('top').each(function () {
            if ($(this).offset().top > cutoff) {
                $(this).addClass('top');
                return false; // stops the iteration after the first one on screen
            }
        });
    };

    InfiniteScroller.prototype.start = function () {
        var self = this;
        this.$scope.bookList = [];

        $('#mainContainer').scroll(function () {
            self.markTop();
            if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
                self.bottomReached();
            } else if ($(this).scrollTop() <= 0) {
                self.topReached();
            }
        });

        window.setTimeout(function () {
            self.addItemsToScope();
        }, 0);
    };

    window.InfiniteScroller = InfiniteScroller;

})();
