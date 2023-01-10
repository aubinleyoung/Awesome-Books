const newBooks = document.querySelector('.new-books-container');
const title = document.getElementById('title');
const form = document.querySelector('.form');
const author = document.getElementById('author');

let localStoragee = JSON.parse(window.localStorage.getItem('allBooks'));
if (
  localStoragee === null
  || localStoragee === undefined
  || localStoragee.length === 0
) {
  localStoragee = [];
}

let allBooks = localStoragee;

/* render each book */
allBooks.forEach((book, index) => {
  const displayBook = `
<div class="book-container">
<p class="book-title">title: ${book.title}</p>
<p class="book-author">Author: ${book.author}</p>
<button class="remove" id=${index}>Remove</button>
</div>
`;
  newBooks.innerHTML += displayBook;
});

const bookExist = (existingT, newTitle) => JSON.stringify(existingT) === JSON.stringify(newTitle);

/* add book */
const addBook = () => {
  const newBook = {
    title: title.value,
    author: author.value,
  };
  /* check if book exist */
  let exist = false;
  localStoragee.forEach((book) => {
    if (bookExist(book.title, title.value)) {
      exist = true;
    }
  });

  /* Dont add if book exist */
  if (exist) return;

  /* add book if it doesn't exist already */
  allBooks.unshift(newBook);
  window.localStorage.setItem('allBooks', JSON.stringify(localStoragee));
  window.location.reload();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

/* remove book */
function remove(buttonId) {
  allBooks = localStoragee.filter((book, index) => index !== buttonId);
  window.localStorage.setItem('allBooks', JSON.stringify(allBooks));
  window.location.reload();
}

const bookBtns = document.querySelectorAll('.remove');

bookBtns.forEach((bookBtn) => {
  bookBtn.addEventListener('click', (e) => {
    const buttonId = parseInt(e.target.getAttribute('id'), 10);
    remove(buttonId);
  });
});
