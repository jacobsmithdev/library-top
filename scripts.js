const libraryDisplay = document.querySelector('#library-display');
const openBookModal = document.querySelector('#open-book-modal');
const bookModal = document.querySelector('#book-modal');
const addBook = document.querySelector('#add-book');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function appendToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}

function updateLibraryDisplay() {
    // Remove previous display elements
    libraryDisplay.innerText = '';

    library.forEach((book, index) => {
        const bookRow = document.createElement('tr');
        bookRow.dataset.index = index;
        
        const title = document.createElement('th');
        title.setAttribute('scope', 'row');
        const author = document.createElement('td');
        const pages = document.createElement('td');

        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages;

        const deleteBtn = createDeleteBtn(bookRow);
        const toggleRead = createToggleRead(bookRow);

        bookRow.classList.add('table__row');

        title.classList.add('table__header');
        author.classList.add('table__data');
        pages.classList.add('table__data', 'table__data--number');
        deleteBtn.classList.add('table__data');
        toggleRead.classList.add('table__data');

        bookRow.append(title, author, pages, toggleRead, deleteBtn);
        libraryDisplay.append(bookRow);
    })
}

function createDeleteBtn(bookRow) {
    const index = bookRow.dataset.index;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add('button', 'button--danger')

    deleteBtn.addEventListener('click', () => {
        library.splice(index, 1);
        updateLibraryDisplay();
    });

    return deleteBtn;
}

function createToggleRead(bookRow) {
    const index = bookRow.dataset.index;
    const id = `bookRow${index}`;

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', id);
    checkBox.checked = library[index].read;

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = 'Read';

    const toggleRead = document.createElement('td');
    toggleRead.append(checkBox, label);
    toggleRead.addEventListener('click', () => {
        library[index].toggleRead();
        updateLibraryDisplay();
    });

    return toggleRead;
}

openBookModal.addEventListener('click', () => {
    bookModal.showModal();
})

addBook.addEventListener('click', () => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    if (title && author && pages) {
        appendToLibrary(title, author, pages, read);
        updateLibraryDisplay();
    }
})

appendToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
appendToLibrary('Crime and Punishment', 'Fyodor Dostoevsky', 608, true);
appendToLibrary('Great Expectations', 'Charles Dickens', 544, false);

updateLibraryDisplay();