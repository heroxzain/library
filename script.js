let myLibrary = [];

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

function addBookToLibrary(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
}

let main = document.querySelector("main");

function clearMain() {
    let mainChildren = document.querySelectorAll("main > *");
    mainChildren.forEach(child => {
        main.removeChild(child);
    });
}

function displayEmptyState() {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.textAlign = "center";
 
        const h2 = document.createElement("h2");
        h2.textContent = "No Books Added Yet";

        const message = document.createElement("p");
        message.textContent = "Please press the + button to add books";

        card.appendChild(h2);
        card.appendChild(message);
        main.appendChild(card);
}

function createDeleteButton(id) {
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.id = "cross";
    btn.title = "Delete";

    btn.addEventListener("click", () => {
        myLibrary = myLibrary.filter(book => book.id !== id);
        display();
    });

    return btn;
}

function createStatusButton(book, card) {
        const btn = document.createElement("button");
        btn.textContent = book.status ? "Read" : "UnRead";
        
        btn.addEventListener("click", () => {
            book.toggleRead();
            btn.textContent = book.status ? "Read" : "UnRead";
            card.classList.toggle("toggle");
        });

        return btn;
}

function createBookCard(book) {
        const card = document.createElement("div");
        card.classList.add("card");
        if (book.status) card.classList.add("toggle");

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("div");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement("div");
        pages.textContent = "Pages: " + book.pages;
        
        const deleteBtn = createDeleteButton(book.id);
        const statusBtn = createStatusButton(book, card);

        card.appendChild(deleteBtn);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(statusBtn);
        return card;
}

function display() {
    clearMain();
    if (myLibrary.length === 0) {
        displayEmptyState();
        return;
    } else 
        myLibrary.forEach((book) => {
            const card = createBookCard(book);
            main.appendChild(card);
        });
}
display();

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
        addBookToLibrary(a, b, c, frmstatus.checked);
        frmtitle.value = "";
        frmauthor.value = "";
        frmpages.value = "";
        display();
        NewBook.close();
    }
});

let cancel = document.querySelector("#cancel");
cancel.addEventListener("click", (e) => {
    e.preventDefault();
    NewBook.close()
});
