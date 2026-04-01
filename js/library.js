const myLibrary = [];
const bookList = document.querySelector(".booklist");

function Book(author,title,pages,read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.rating = addRating();

    function addRating() {
        if (this.read.toLowerCase()==="no") {
            this.rating = "Not rated yet";
        } else if (this.read.toLowerCase()==="yes") {
            this.rating = +prompt("Please enter a book rating (?/10):");
        }
    }
}

function addBookToLibrary(author,title,pages,read) {
    if (!findBook(author,title)) {
        let newBook = new Book(author,title,pages,read);
        myLibrary.push(newBook);
    } else {
        alert("Book already in library database");
    }
}

function findBook(author,title) {
    for (const book of myLibrary) {
        if(book.author === author && book.title == title) {
            return true;
        }
    }
    return false;
}

function showBooks() {
    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("book-description");
        for (const [key,value] of Object.entries(book)) {
            const info = document.createElement("p");
            info.classList.add(`${key}`);
            info.textContent =  `${value}`;
            card.append(info);
        }
        bookList.appendChild(card);
    }
}