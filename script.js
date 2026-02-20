let myLibrary = [];

function Book() {
    this.id = undefined;
    this.title = undefined;
    this.author = undefined;
    this.pages = undefined;
    this.status = undefined;
}

Book.prototype.addBookToLibrary = function(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    myLibrary.push(this);
}

let main = document.querySelector("main");

function display() {
    let mainChildren = document.querySelectorAll("main > *");
    mainChildren.forEach(child => {
        main.removeChild(child);
    });
    if (myLibrary.length === 0) {
        let card = document.createElement("div");
        let h2 = document.createElement("h2");
        let message = document.createElement("p");
        card.classList.add("card");
        card.style.textAlign = "center";
        h2.textContent = "No Books Added Yet";
        message.textContent = "Please press the + button to add books";
        card.appendChild(h2);
        card.appendChild(message);
        main.appendChild(card);
    } else 
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let title = document.createElement("h2");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let btn = document.createElement("button");
        let cross = document.createElement("button");
        cross.textContent = "X";
        cross.setAttribute("title", "Delete");
        cross.setAttribute("id", "cross");
        cross.setAttribute("data-identifier", book.id);
        cross.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            main.removeChild(card);
            display();
        });
        title.textContent = book.title;
        author.textContent = "Author: " + book.author;
        pages.textContent = "Pages: " + book.pages;
        btn.textContent = book.status ? "Read" : "UnRead";
        btn.addEventListener("click", () => {
            book.status = book.status ? false : true;
            btn.textContent = book.status ? "Read" : "UnRead";
            card.classList.toggle("toggle");
        });
        card.appendChild(cross);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btn);
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
        let book = new Book();
        book.addBookToLibrary(a, b, c, frmstatus.checked);
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
