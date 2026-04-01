const myLibrary = [];
const bookList = document.querySelector(".booklist");

const dialog = document.getElementById("add-book");
const confirmBtn = dialog.querySelector("#confirm-add-book");

function Book(author,title,pages,read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.rating = addRating();

    function addRating() {
        if (read.toLowerCase()==="no") {
            return "Not rated yet";
        } else if (read.toLowerCase()==="yes") {
            return +prompt("Please enter a book rating (?/10):");
        }
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

function addBookToLibrary(author,title,pages,read) {
    if (!findBook(author,title)) {
        let newBook = new Book(author,title,pages,read);
        myLibrary.push(newBook);
    } else {
        alert("Book already in library database");
    }
}

function showBooks() {
    bookList.innerHTML= "";
    
    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("book-description");
        for (const [key,value] of Object.entries(book)) {
            if (key !== "id") {
                const info = document.createElement("p");
                info.classList.add(`${key}`);
                info.textContent = `${key.charAt(0).toUpperCase()+key.substring(1)}: ${value}`;
                card.append(info);
            }
        }
        const toggleRead = document.createElement("button");
        const deleteBook = document.createElement("button");
        toggleRead.classList.add("card-buttons")
        deleteBook.classList.add("card-buttons")
        toggleRead.textContent = "Toggle Read";
        deleteBook.textContent = "Delete";
        deleteBook.addEventListener("click",function (){
            deletion(book.id);
        });
        card.appendChild(toggleRead);
        card.appendChild(deleteBook);
        bookList.appendChild(card);
    }
}

console.log(myLibrary);

confirmBtn.addEventListener("click", function() {
    const author = dialog.querySelector("#author").value;
    const title = dialog.querySelector("#title").value;
    const pages = dialog.querySelector("#pages").value;
    const read = dialog.querySelector("#read").value;
    addBookToLibrary(author,title,pages,read);
    showBooks();

    dialog.close();
    
    dialog.querySelector("#author").value = "";
    dialog.querySelector("#title").value = "";
    dialog.querySelector("#pages").value = "";
    dialog.querySelector("#read").value = "";
});

function deletion(bookId) {
    for (const book of myLibrary) {
        if (book.id === bookId) {
            const index =  myLibrary.indexOf(book);
            myLibrary.splice(index,1);
            showBooks();
        }
    }
}





