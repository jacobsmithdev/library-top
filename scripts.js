const libraryDisplay = document.querySelector('#library-display');
const openBookModal = document.querySelector('#open-book-modal');
const bookModal = document.querySelector('#book-modal');
const addBook = document.querySelector('#add-book');

const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function appendToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}

function updateLibraryDisplay() {
    // Remove previous display elements
    libraryDisplay.innerText = '';

    library.forEach((book, index) => {
        const tr = document.createElement('tr');
        tr.dataset.index = index;
        
        const title = document.createElement('td');
        const author = document.createElement('td');
        const pages = document.createElement('td');
        const read = document.createElement('td');

        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages;
        read.innerText = book.read ? 'Read' : 'Unread';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "delete";
        deleteBtn.dataset.index = index;
        deleteBtn.addEventListener('click', () => {
            library.splice(tr.dataset.index, 1);
            updateLibraryDisplay();
        });

        tr.append(title, author, pages, read, deleteBtn);
        libraryDisplay.append(tr);
    })
}

openBookModal.addEventListener('click', () => {
    bookModal.showModal();
})

addBook.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    if (title && author && pages) {
        appendToLibrary(title, author, pages, read);
        updateLibraryDisplay();
    }
})

appendToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
appendToLibrary('Crime and Punishment', 'Fyodor Dostoevsky', 608, true);
appendToLibrary('Great Expectations', 'Charles Dickens', 544, false);

updateLibraryDisplay();