const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function () {
    let bookInformation = `${this.title} by ${this.author}, ${this.pages} pages, `;
    bookInformation = this.haveRead
        ? bookInformation + "have read"
        : bookInformation + "not read yet";
    return bookInformation;
};

function addBookToLibrary(book) {
    for (const book of arguments) {
        myLibrary.push(book);
    }
}

function displayLibraryBooks() {
    for (const book of myLibrary) {
        let bookCardTemplate = document
            .querySelector(".card.template")
            .cloneNode(true);
        bookCardTemplate.querySelector(".title").textContent = book.title;
        bookCardTemplate.querySelector(".author").textContent = book.author;
        bookCardTemplate.querySelector(".page-count").textContent = book.pages;
        if (book.haveRead) {
            bookCardTemplate.querySelector(".have-read").textContent =
                "Have read";
        }
        document.querySelector(".content").appendChild(bookCardTemplate);
    }
}

// Test data
let book1 = new Book("Bao bao number 1", "Me", 5000, true);
let book2 = new Book("u uwawa uwa", "Chiikawa", 250, false);
let book3 = new Book("yaha ururururur", "usagi", 450, true);

// execution phase
addBookToLibrary(book1, book2, book3);
displayLibraryBooks();