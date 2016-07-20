Infnite list
===================
This is an example of an implementation of a long list with AngularJS.

Features:
- Infinite scroll
- Sort by book name
- Sort by author name
- Filter by author gender
- Filter by genre
- Filter the horror books published on Halloween

--------
Generate the book list
----------------
In this example we are using a list of books. This is an example of book:

    {
	    "name":"Variety where captured wild evening sleep themselves bat student",
	    "author": {
		    "name":"Filoména Stodola",
		    "gender":"Female"
	    },
	    "genre":"History",
	    "publishData":"2012-06-28T08:29:00.872Z"
    }

### Generate the authors
To generate the list of books we first generate a list of authors:	(from project root)

	node listGenerator/generateAuthors.js
This will generate a file called *authorList.json* with one million authors that will be used later to generate the books. You can change the length of the list by modifying the "maxListLength" variable.

### Generate the books
Remember that to be able to generate the books we need to have the authors generated previously. This is done in a separated process to allow you reuse the list of authors for multiple lists of books.

	node listGenerator/generateBooks.js
This will create a file called *booksList.json* with one million books. You can change the length of the list by modifying the "maxListLength" variable.

----------

Run the web
-------------

### Prepare the list file
This web expects to find the book list inside the "web" folder. There you will find some book lists with different sizes (from 100 to 100000). The list of one million books was too big to be uploaded to GitHub.

To choose which list you want to load you can modify "bookListUrl" variable located in the file *booklist.js*.

### Prepare web server
The web is located in the folder "web". To run it you can use the tool you usually uses to load static web pages, for example:

	cd web
	python -m SimpleHTTPServer 8000

---------------------------
TODO:
-----------
- Make it look pretty: This is just the bare minimum to make it work.
- Make the filters and headers stay visible when scrolling: only the body of the table should scroll.
- Add functional tests.

Implementation decisions
------------
There are multiple solutions to the problem that appears when a user needs to see a lot of data in a list and most of them are solved with a product decision: pagination. But when the product is designed to work with all the data available in a single list those problems must be fixed and the main solution is an infinite scroll.

There are at least two different ways of creating an infinite scroll:

1. Client gets the items of the list on demand from the server.
2. Client gets all the items of the list at the start and shows them on demand.

On the first case the server will have to handle a higher amount of calls, but the network will avoid a lot of traffic.

On the second case the application will be much heavier on client memory and network usage, but the server will less stressed.

On top of that we have to consider that we want to be able to sort and filter the items. If we are using the first option the server will have to handle the sorting and filtering for each update of the list and that add a lot of stress to the server, but if we use the second option we can do the sorting and filtering in the client.

Considering that we have a list with fixed length (known amount of memory usage), that we know that the user will look at the whole list (fix amount of network consumption), that we need to filter and sort, and that we don't have a back-end I've decided that the best option is the second one.
