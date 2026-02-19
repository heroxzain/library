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

// Remove this useless part
let book1 = new Book();
let book2 = new Book();
let book3 = new Book();
let book4 = new Book();
book1.addBookToLibrary("SE", "zain", 100, true);
book2.addBookToLibrary("SDA", "mataiba", 200, false);
book3.addBookToLibrary("SE", "zain", 100, true);
book4.addBookToLibrary("SDA", "mataiba", 200, false);
console.log(myLibrary);

let main = document.querySelector("main");

function display() {
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
        cross.setAttribute("id", "cross");
        cross.setAttribute("data-identifier", book.id);
        cross.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            main.textContent = "";
            display();
        });
        title.textContent = book.title;
        author.textContent = "Author: " + book.author;
        pages.textContent = "Pages: " + book.pages;
        btn.textContent = book.status ? "Read" : "UnRead";
        btn.addEventListener("click", () => {
            book.status = book.status ? false : true;
            btn.textContent = book.status ? "Read" : "UnRead";
            // toggle theme of card
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