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
    this.status = (status) ? "read" : "unread";
    myLibrary.push(this);
}

let book1 = new Book();
let book2 = new Book();
let book3 = new Book();
let book4 = new Book();
book1.addBookToLibrary("SE", "zain", 100, true);
book2.addBookToLibrary("SDA", "mataiba", 200, false);
book3.addBookToLibrary("SE", "zain", 100, true);
book4.addBookToLibrary("SDA", "mataiba", 200, false);
console.log(myLibrary);

