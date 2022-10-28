// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // Checks for errors if no errors renders the display booklist page 
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*Renders displayAdd page(shows page output)*/

    res.render('index', { title: 'Add Book information', page: 'books/add', books: {} });

}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /* Creates new book collection*/
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price

    });
    //Checks for errors, creates book collection, no errors redirects to /books/list
    booksModel.create(newBook, (err, Books) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/books/list');
    });
}
// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*id property of Book*/
    let id = req.params.id;

    // find books by id, checks if theres an error if not renders page /books/edit
    booksModel.findById(id, (err, books) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit Book information', page: '/books/edit', books: books });
    });

}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*Id property of Book */

    let id = req.params.id;
    // uses id of book to reference book that needs to be edited through booksModel
    let newBook = booksModel({
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price

    });
    // checks for error, updates book info through id, if no errors are caught redirects back to books/list 
    booksModel.updateOne({ _id: id }, newBook, (err, Books) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/books/list')
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*id property of book*/
    let id = req.params.id;

    // removes book through id, checks for errors, no errors are caught redirects to books/list
    booksModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books/list');
    });
}

