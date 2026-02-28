class Library {
    constructor(){
        this.myLibrary = [];
    }

    addBook(title, author, pages, status) {
        let book = new Book(title, author, pages, status);
        this.myLibrary.push(book);
    }

    removeBook(id) {
        this.myLibrary = this.myLibrary.filter(book => book.id !== id);
    }

    isEmpty() {
        return this.myLibrary.length === 0;
    }
}

class Book {
    constructor(title, author, pages, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toggleRead() {
        this.status = !this.status;
    }
}

class LibraryUI {
    constructor(library) {
        this.library = library;
        this.main = document.querySelector("main");
    }

    clearMain() {
        this.main.innerHTML = "";
    }

    displayEmptyState() {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.textAlign = "center";

        const h2 = document.createElement("h2");
        h2.textContent = "No Books Added Yet";

        const message = document.createElement("p");
        message.textContent = "Please press the + button to add books";

        card.append(h2, message);
        this.main.appendChild(card);
    }

    createDeleteButton(id) {
        const btn = document.createElement("button");
        btn.id = "cross";
        btn.title = "Delete";
        btn.textContent = "X";

        btn.addEventListener("click", () => {
            this.library.removeBook(id);
            this.display();
        });

        return btn;
    }

    createStatusButton(book, card) {
        const btn = document.createElement("button");
        btn.textContent = book.status ? "Read" : "UnRead";

        btn.addEventListener("click", () => {
            book.toggleRead();
            btn.textContent = book.status ? "Read" : "UnRead";
            card.classList.toggle("toggle");
        });

        return btn;
    }

    createBookCard(book) {
        const card = document.createElement("div");
        card.classList.add("card");
        if (book.status) card.classList.add("toggle");

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("div");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("div");
        pages.textContent = "Pages: " + book.pages;

        card.append(
            this.createDeleteButton(book.id),
            title,
            author,
            pages,
            this.createStatusButton(book, card)
        );

        return card;
    }

    display() {
        this.clearMain();

        if (this.library.isEmpty()) {
            this.displayEmptyState();
            return;
        }

        this.library.myLibrary.forEach(book => {
            this.main.appendChild(this.createBookCard(book));
        });
    }
}

function setTheme() {
    let root = document.documentElement;
    root.className = ((root.className === "dark") ? "light" : "dark");
}
document.querySelector(".theme").addEventListener("click", setTheme);

let NewBook = document.querySelector("#NewBook");
let add = document.querySelector(".add");
add.addEventListener("click", () => {
    NewBook.showModal();
});

let frmtitle = document.querySelector("#title");
let frmauthor = document.querySelector("#author");
let frmpages = document.querySelector("#pages");
let frmstatus = document.querySelector("#status");
let confirm = document.querySelector("#confirm");
confirm.addEventListener("click", (e) => {
    let a = frmtitle.value, b = frmauthor.value, c = frmpages.value;
    if (!(a == "" || b == "" || c == "")) {
        e.preventDefault();
        library.addBook(a, b, c, frmstatus.checked);
        frmtitle.value = "";
        frmauthor.value = "";
        frmpages.value = "";
        ui.display();
        NewBook.close();
    }
});

let cancel = document.querySelector("#cancel");
cancel.addEventListener("click", (e) => {
    e.preventDefault();
    NewBook.close()
});

const library = new Library();
const ui = new LibraryUI(library);
ui.display();