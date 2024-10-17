const myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    info = () => {
        let bookInformation = `${this.title} by ${this.author}, ${this.pages} pages, `;
        bookInformation = this.readStatus
            ? bookInformation + "have read"
            : bookInformation + "not read yet";
        return bookInformation;
    };

    toggleReadStatus = () => {
        this.readStatus = !this.readStatus;
    };
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
        bookCardTemplate.querySelector(".have-read").textContent =
            "Already read";
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

function clearBookDisplay() {
    const displayedBooks = document.querySelectorAll(".content > .card");
    for (const bookCard of displayedBooks) {
        bookCard.remove();
    }
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

function handleSubmitNewBook() {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        // validate input
        event.preventDefault();
        addBookToLibrary(createBookFromDialog());
        document.querySelector("form").reset();
        dialog.close();
        let newestBookIndex = myLibrary.length - 1;
        displayLibraryBook(myLibrary[newestBookIndex], newestBookIndex);
    });
}

function handleClickCardButtons() {
    const content = document.querySelector(".content");
    content.addEventListener("click", (event) => {
        // Remove book card from myLibrary
        const target = event.target;
        const targetCardLibraryIndex =
            target.closest(".card").dataset.libraryIndex;
        switch (target.classList[0]) {
            case "remove-btn":
                myLibrary.splice(targetCardLibraryIndex, 1);
                clearBookDisplay();
                displayAllLibraryBooks();
                break;
            case "toggle-read-btn":
                myLibrary[targetCardLibraryIndex].toggleReadStatus();
                clearBookDisplay();
                displayAllLibraryBooks();
                break;
        }
    });
}

const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#page-count-input");

function validateText(input) {
    if (input.validity.valid) {
        input.setCustomValidity('')
    } else if (input.validity.valueMissing) {
        input.setCustomValidity('Please enter a value');
    } else if (input.validity.tooShort) {
        input.setCustomValidity('Please enter at least 3 characters');
    }
}

title.addEventListener('input', (event) => {
    const target = event.target;
    validateText(target);
})

// Test data
let book1 = new Book("Bao bao number 1", "Me", 5000, true);
let book2 = new Book("u uwawa uwa", "Chiikawa", 250, false);
let book3 = new Book("yaha ururururur", "usagi", 450, true);

// execution phase
addBookToLibrary(book1, book2, book3);
displayAllLibraryBooks();
handleClickAddNewBookButton();
handleClickCloseDialogButton();
handleSubmitNewBook();
handleClickCardButtons();
