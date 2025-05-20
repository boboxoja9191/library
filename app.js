const openBtn = document.querySelector(".btn-add");
const modal = document.querySelector(".modal-window");
const form = document.querySelector(".modal-form");
const booksGrid = document.querySelector(".books-grid");

let books = JSON.parse(localStorage.getItem("books")) || [];

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function createBookCard(book) {
  const newBook = document.createElement("div");
  newBook.classList.add("book-card");
  newBook.innerHTML = `
    <h2 class="book__title">"${book.title}"</h2>
    <h3 class="book__author">${book.author}</h3>
    <h3 class="book__pages">${book.pages} bet</h3>
    <div class="btn-group">
      <button class="btn btn-red">${
        book.isRead ? "Tugallangan" : "Tugallanmagan"
      }</button>
      <button class="btn btn-remove">o'chirish</button>
    </div>
  `;

  newBook.querySelector(".btn-remove").addEventListener("click", () => {
    books = books.filter(
      (b) => !(b.title === book.title && b.author === book.author)
    );
    localStorage.setItem("books", JSON.stringify(books));
    booksGrid.removeChild(newBook);
  });

  booksGrid.appendChild(newBook);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("is-read").checked;

  const newBook = { title, author, pages, isRead };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  createBookCard(newBook);
  form.reset();
  modal.style.display = "none";
});

books.forEach((book) => createBookCard(book));
