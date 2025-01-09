const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let status = this.read ? `read` : `not read`;
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
}