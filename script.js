// Navigation links
const listBtn = document.querySelector('.list-btn');
const addNewBtn = document.querySelector('.add-new-btn');
const aboutBtn = document.querySelector('.contact-btn');
const clock = document.querySelector('#clock');

const listContainer = document.getElementById('list-container');
const addNewContainer = document.getElementById('add-new-container');
const contactContainer = document.getElementById('contact-container');

const timeNow = () => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).split(' ').join(' ');
  clock.innerHTML = today;
};

setInterval(() => {
  timeNow();
}, 1000);

listBtn.addEventListener('click', () => {
  listContainer.style.display = 'block';
  contactContainer.style.display = 'none';
  addNewContainer.style.display = 'none';
});

addNewBtn.addEventListener('click', () => {
  listContainer.style.display = 'none';
  contactContainer.style.display = 'none';
  addNewContainer.style.display = 'block';
});
aboutBtn.addEventListener('click', () => {
  listContainer.style.display = 'none';
  addNewContainer.style.display = 'none';
  contactContainer.style.display = 'block';
});

class BookList {
  constructor() {
    this.title = document.getElementById('title');
    this.form = document.querySelector('.form');
    this.author = document.getElementById('author');
    this.newBooks = document.querySelector('.new-books-container');
    this.storage = JSON.parse(window.localStorage.getItem('allBooks')) || [];
    this.allBooks = this.storage;

    this.bookExist = (existiingTitle,
      newTitle) => JSON.stringify(existiingTitle) === JSON.stringify(newTitle);

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBook();
      this.title.value = '';
      this.author.value = '';
    });

    this.storage.forEach((book, index) => {
      if (book.title && book.title !== this.title.value) {
        const displayBook = `
        <div class="book-container">
        <div class="title-author">
        <p class="book-title">"${book.title}"</p>
        <p>by</p>
        <p class="book-author">${book.author}</p>
        </div>
        <button class="remove" id=${index}>Remove</button>
       
        </div>
      `;
        this.newBooks.innerHTML += displayBook;
      }
    });

    /* compare and remove */
    const bookBtns = document.querySelectorAll('.remove');
    bookBtns.forEach((bookBtn) => {
      bookBtn.addEventListener('click', (e) => {
        const buttonId = parseInt(e.target.getAttribute('id'), 10);
        this.remove(buttonId);
      });
    });
  }

  /* add book */
  addBook(title, author) {
    /* check if book exist */
    let exist = false;
    this.allBooks.forEach((book) => {
      if (this.bookExist(book.title, this.title.value)) {
        exist = true;
      }
    });

    /* add book if it doesn't exist already */
    if (exist === false) {
      const newBook = new BookList(title, author);
      this.allBooks.unshift({ title: newBook.title.value, author: newBook.author.value });
      window.localStorage.setItem('allBooks', JSON.stringify(this.storage));
      window.location.reload();
    }
  }

  /* remove book */
  remove(buttonId) {
    this.allBooks = this.allBooks.filter((book, index) => index !== buttonId);
    window.localStorage.setItem('allBooks', JSON.stringify(this.allBooks));
    window.location.reload();
  }
}

/* eslint-disable */
const freshBook = new BookList();