const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    let bookInformation = `${this.title} by ${this.author}, ${this.pages} pages, `
    bookInformation = this.haveRead ? bookInformation + "have read" : bookInformation + "not read yet";
    return  bookInformation;
}

function addBookToLibrary(book) {
    for (const book of arguments) {
        myLibrary.push(book);
    }
}

// Test data
let book1 = new Book("Test 1", "author 1", 250, true);
let book2 = new Book("Test 2", "author 2", 250, false);
let book3 = new Book("Test 3", "author 3", 250, true);

// execution phase
addBookToLibrary(book1, book2, book3);