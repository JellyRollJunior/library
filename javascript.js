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

function displayLibraryBook(book) {
    let bookCardTemplate = document
        .querySelector(".card.template")
        .cloneNode(true);
    bookCardTemplate.querySelector(".title").textContent = book.title;
    bookCardTemplate.querySelector(".author").textContent = book.author;
    bookCardTemplate.querySelector(".page-count").textContent = book.pages;
    if (book.haveRead) {
        bookCardTemplate.querySelector(".have-read").textContent = "Have read";
    }
    document.querySelector(".content").appendChild(bookCardTemplate);
}

function displayAllLibraryBooks() {
    for (const book of myLibrary) {
        displayLibraryBook(book);
    }
}

function createBookFromDialog() {
    let title = document.querySelector("#title-input").value;
    let author = document.querySelector("#author-input").value;
    let pages = document.querySelector("#page-count-input").value;
    let haveRead = document.querySelector("#read-checkbox").checked;
    return new Book(title, author, pages, haveRead);
}

/* Event listeners */
function handleClickAddNewBookButton() {
    const dialog = document.querySelector("dialog");
    let newBookButton = document.querySelector("#new-book-btn");
    newBookButton.addEventListener("click", (event) => {
        dialog.showModal();
        console.log("pog");
    });
}

function handleClickCloseDialogButton() {
    const dialog = document.querySelector("dialog");
    const closeDialogButton = document.querySelector("#close-dialog-btn");
    closeDialogButton.addEventListener("click", () => {
        dialog.close();
    });
}

function handleClickConfirmButton() {
    const dialog = document.querySelector("dialog");
    const confirmButton = document.querySelector(`button[type="submit"`);
    confirmButton.addEventListener("click", (event) => {
        event.preventDefault();
        addBookToLibrary(createBookFromDialog());
        document.querySelector("form").reset();
        dialog.close();
        displayLibraryBook(myLibrary[myLibrary.length - 1]);
    });
}

// Test data
let book1 = new Book("Bao bao number 1", "Me", 5000, true);
let book2 = new Book("u uwawa uwa", "Chiikawa", 250, false);
let book3 = new Book("yaha ururururur", "usagi", 450, true);

// execution phase
addBookToLibrary(book1, book2, book3);
displayAllLibraryBooks();
handleClickAddNewBookButton();
handleClickCloseDialogButton();
handleClickConfirmButton();