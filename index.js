const library = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const status = document.getElementById('status');

  const book = new Book(title.value, author.value, pages.value, status.value);
  library.push(book);
}

function createDiv(data) {
  const divTag = document.createElement('div');
  divTag.className = 'grid-column';

  const paraTag = document.createElement('p');
  paraTag.textContent = data;

  divTag.appendChild(paraTag);
  return divTag;
}

function createVerticalRule() {
  const verticalRule = document.createElement('div');
  verticalRule.className = 'vertical-rule';
  return verticalRule;
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'delete';
  return deleteButton;
}

function deleteBook(bookId) {
  library.splice(Number(bookId) - 1, 1);
  const childToBeDeleted = document.getElementById(bookId);

  childToBeDeleted.parentElement.removeChild(childToBeDeleted);

  const bookIds = document.getElementsByClassName('row-id');
  const rowIds = document.getElementsByClassName('new-row');

  let i = Number(bookId) - 1;
  for (; i < library.length; i += 1) {
    rowIds.item(i).id = String(i + 1);
    bookIds.item(i).textContent = i + 1;
  }
}

function createCard(lib, index) {
  const newRow = document.createElement('div');
  newRow.className = 'new-row';
  newRow.id = String(index);

  const bookId = createDiv(index);
  const bookTitle = createDiv(lib.title);
  const bookAuthor = createDiv(lib.author);
  const bookPages = createDiv(lib.pages);
  const bookStatus = createDiv(lib.status);
  const deleteButton = createDeleteButton(index);

  const book = [bookId, bookTitle, bookAuthor, bookPages, bookStatus];
  const bookClassNames = ['row-id', 'row-title', 'row-author', 'row-pages', 'row-status'];

  if (lib.status === 'read') {
    bookStatus.firstChild.style.color = 'green';
  } else {
    bookStatus.firstChild.style.color = 'red';
  }

  for (let i = 0; i < book.length; i += 1) {
    book[i].firstChild.className = bookClassNames[i];
    newRow.appendChild(book[i]);
    newRow.appendChild(createVerticalRule());
  }

  newRow.appendChild(deleteButton);
  newRow.lastElementChild.addEventListener('click', (ev) => {
    deleteBook(ev.target.parentElement.id);
  });

  const bookStatusEvent = newRow.getElementsByClassName('row-status').item(0);
  bookStatusEvent.addEventListener('click', (ev) => {
    const bookStatusPara = ev.target;
    const bookStatusParentId = bookStatusPara.parentElement.parentElement.id;

    if (bookStatusPara.textContent === 'read') {
      bookStatusPara.textContent = 'not read';
      library[Number(bookStatusParentId) - 1].status = 'not read';
      bookStatusPara.style.color = 'red';
    } else {
      bookStatusPara.textContent = 'read';
      library[Number(bookStatusParentId) - 1].status = 'read';
      bookStatusPara.style.color = 'green';
    }
    console.log(library);
  });

  return newRow;
}

function display(lib) {
  const gridContainer = document.getElementById('main-grid');
  let i = gridContainer.getElementsByClassName('new-row').length;

  for (; i < lib.length; i += 1) {
    const newRow = createCard(lib[i], i + 1);
    gridContainer.appendChild(newRow);
  }
}

const saveButton = document.getElementById('save');
const backButton = document.getElementById('back');
const addIcon = document.getElementById('add-button');

addIcon.addEventListener('click', () => {
  const popUp = document.getElementsByClassName('pop-up').item(0);
  popUp.style.display = 'flex';
  addIcon.style.display = 'none';
});

function clearInput() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const status = document.getElementById('status');
  title.value = '';
  author.value = '';
  pages.value = '';
  status.value = 'read';
}

backButton.onclick = () => {
  const popUp = document.getElementsByClassName('pop-up').item(0);
  popUp.style.display = 'none';
  addIcon.style.display = 'flex';
  clearInput();
};

saveButton.onclick = (ev) => {
  addBookToLibrary();
  display(library);

  const popUp = document.getElementsByClassName('pop-up').item(0);
  popUp.style.display = 'none';
  addIcon.style.display = 'flex';

  clearInput();
  ev.preventDefault();
};
