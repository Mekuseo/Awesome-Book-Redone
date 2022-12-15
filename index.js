import UI from './modules/UI.js';
import Book from './modules/Book.js';
import Store from './modules/Store.js';
import displayDate from './modules/time.js';

const luxon = require('luxon'); 

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.showBooks);

// Event: Add a Book
const bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    return UI.showAlert('Please fill in all fields', 'danger');
  }
  UI.showAlert('Book added', 'success');

  const book = new Book(title, author);

  UI.addBookToList(book);

  Store.addBook(book);

  UI.clearFields();

  return false;
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  e.preventDefault();
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
});

// Menu Toggle
const addNew = document.querySelector('.add-new');
const list = document.querySelector('.list');
const contact = document.querySelector('.contact');

const bookForms = document.querySelector('.book-forms');
const bookTitle = document.querySelector('.book-title');
const contactUs = document.querySelector('.contact-us');
const myBooks = document.querySelector('.my-books');

addNew.addEventListener('click', () => {
  bookForms.style.display = 'block';
  bookTitle.style.display = 'block';
  contactUs.style.display = 'none';
  myBooks.style.display = 'none';
});

list.addEventListener('click', () => {
  myBooks.style.display = 'inline';
  bookForms.style.display = 'none';
  bookTitle.style.display = 'block';
  contactUs.style.display = 'none';
});

contact.addEventListener('click', () => {
  contactUs.style.display = 'block';
  bookForms.style.display = 'none';
  bookTitle.style.display = 'none';
  myBooks.style.display = 'none';
});

const nav = document.querySelector('nav');
const date = luxon.DateTime.fromISO('2022-12-15T00:00:00');

nav.prepend(date.toLocaleString(luxon.DateTime.DATE_MED));
setInterval(displayDate, 1000);