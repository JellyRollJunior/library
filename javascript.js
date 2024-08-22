const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    let bookInformation = `${this.title} by ${this.author}, ${this.pages} pages, `;
    bookInformation = this.readStatus
        ? bookInformation + "have read"
        : bookInformation + "not read yet";
    return bookInformation;
};

function toggleReadStatus(bookIndex) {
    let book = myLibrary[bookIndex];
    book.readStatus = !book.readStatus;
}

function addBookToLibrary(book) {
    for (const book of arguments) {
        myLibrary.push(book);
    }
}

function displayLibraryBook(book, index) {
    let bookCardTemplate = document
        .querySelector(".templates > .card")
        .cloneNode(true);
    bookCardTemplate.setAttribute("data-library-index", index);
    bookCardTemplate.querySelector(".title").textContent = book.title;
    bookCardTemplate.querySelector(".author").textContent = book.author;
    bookCardTemplate.querySelector(".page-count").textContent = book.pages;
    if (book.readStatus) {
        bookCardTemplate.querySelector(".have-read").textContent = "Already read";
    }
    document.querySelector(".content").appendChild(bookCardTemplate);
}

function displayAllLibraryBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayLibraryBook(myLibrary[i], i);
    }
}

function createBookFromDialog() {
    let title = document.querySelector("#title-input").value;
    let author = document.querySelector("#author-input").value;
    let pages = document.querySelector("#page-count-input").value;
    let readStatus = document.querySelector("#read-checkbox").checked;
    return new Book(title, author, pages, readStatus);
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
        let newestBookIndex = myLibrary.length - 1;
        displayLibraryBook(myLibrary[newestBookIndex], newestBookIndex);
    });
}

function handleClickRemoveButton() {
    const content = document.querySelector(".content");
    content.addEventListener("click", (event) => {
        // Remove book card from myLibrary
        const target = event.target;
        switch (target.classList[0]) {
            case "remove-btn":
                // Remove book from library
                const removeIndex = target.parentElement.dataset.libraryIndex;
                myLibrary.splice(removeIndex, 1);
                // Remove all cards from display
                const displayedBooks =
                    document.querySelectorAll(".content > .card");
                for (const bookCard of displayedBooks) {
                    bookCard.remove();
                }
                // Rebuild display
                displayAllLibraryBooks();
                break;
        }
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
handleClickRemoveButton();
