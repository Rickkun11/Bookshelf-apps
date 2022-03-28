//validasi localstorage
const data_buku = "bookshelf_riky";
let books = [];

ifStorageSupport = () => {
	if (typeof Storage === "undefined") {
		alert("failure!");
		return false;
	} else {
		return true;
	}
}

updateJson = () => {
	if (ifStorageSupport()) {
		localStorage.setItem(data_buku, JSON.stringify(books));
	}
}

fetchJson = () => {
	let data = JSON.parse(localStorage.getItem(data_buku));

	if (data !== null) {
		books = data;
	}

	document.dispatchEvent(new Event("fetch"));
}

book_object = (id, title, author, year, isComplete) => {
	return {
		id,
		title,
		author,
		year,
		isComplete,
	};
}

bookIdentity = () => {
	for (book of books) {
		const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

		if (book.isComplete) {
			document.getElementById(COMPLETE_BOOK).append(newBook);
		} else {
			document.getElementById(INCOMPLETE_BOOK).append(newBook);
		}
	}
}

deleteBook = (bookId) => {
	for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
		if (books[arrayPosition].id == bookId) {
			books.splice(arrayPosition, 1);
			break;
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {

	const input_book = document.getElementById("inputBook");
	const search_book = document.getElementById("searchBook");

	input_book.addEventListener("submit", function (event) {
		event.preventDefault();
		addBook();

		document.getElementById("inputBookTitle").value = "";
		document.getElementById("inputBookAuthor").value = "";
		document.getElementById("inputBookYear").value = "";
		document.getElementById("inputBookIsComplete").checked = false;
	});

	search_book.addEventListener("submit", function (event) {
		event.preventDefault();

		const inputSearch = document.getElementById("searchBookTitle").value;
		bookFilter(inputSearch);
	})

	if (ifStorageSupport()) {
		fetchJson();
	}
});

document.addEventListener("fetch", function () {
	bookIdentity();
});

const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";

addBook = () => {
	const bookId = +new Date();
	const inputBookTitle = document.getElementById("inputBookTitle").value;
	const inputBookAuthor = document.getElementById("inputBookAuthor").value;
	const inputBookYear = document.getElementById("inputBookYear").value;
	const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

	const book = createBook(bookId, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
	const bookObject = book_object(bookId, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

	books.push(bookObject);

	if (inputBookIsComplete) {
		document.getElementById(COMPLETE_BOOK).append(book);
	} else {
		document.getElementById(INCOMPLETE_BOOK).append(book);
	}

	updateJson();
}

createBook = (bookId, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) => {
	const book = document.createElement("article");
	book.setAttribute("id", bookId)
	book.classList.add("book_item");

	const bookTitle = document.createElement("h3");
	bookTitle.innerText = inputBookTitle;

	const bookAuthor = document.createElement("span");
	bookAuthor.innerText = inputBookAuthor;

	const bookYear = document.createElement("span");
	bookYear.innerText = inputBookYear;

	const br = document.createElement("br");

	const detail_book = document.createElement("div");
	detail_book.classList.add("box");

	const content_book = document.createElement("div");
	content_book.classList.add("list_content");

	const action_book = addAction(inputBookIsComplete, bookId);

	content_book.append(bookTitle, bookAuthor, br, bookYear);
	detail_book.append(content_book);
	detail_book.append(action_book);
	book.append(detail_book);

	return book;
}

addAction = (inputBookIsComplete, bookId) => {
	const action_books = document.createElement("div");
	action_books.classList.add("action");

	const actionDelete = DeleteAction(bookId);
	const actionRead = ReadAction(bookId);
	const actionUndo = UndoAction(bookId);

	action_books.append(actionDelete);

	if (inputBookIsComplete) {
		action_books.append(actionUndo);
	} else {
		action_books.append(actionRead);
	}

	return action_books;
}

DeleteAction = (bookId) => {
	const actionDelete = document.createElement("button");
	actionDelete.classList.add("red");
	actionDelete.innerText = "hapus";
	actionDelete.style.color = "white";

	actionDelete.addEventListener("click", function () {
		let konfirmasi = confirm("Yakin? hapus buku nya hihi 😀");

		if (konfirmasi) {
			const book_itemParent = document.getElementById(bookId);
			book_itemParent.addEventListener("eventDelete", function (event) {
				event.target.remove();
			});
			book_itemParent.dispatchEvent(new Event("eventDelete"));

			deleteBook(bookId);
			updateJson();
		}
	});

	return actionDelete;
}

ReadAction = (bookId) => {
	const action = document.createElement("button");
	action.classList.add("green");
	action.innerText = "Selesai Baca";
	action.style.color = "white";

	action.addEventListener("click", function () {
		const book_itemParent = document.getElementById(bookId);

		const bookTitle = book_itemParent.querySelector("h3").innerText;
		const bookAuthor = book_itemParent.querySelectorAll("span")[0].innerText;
		const bookYear = book_itemParent.querySelectorAll("span")[1].innerText;

		book_itemParent.remove();

		const book = createBook(bookId, bookTitle, bookAuthor, bookYear, true);
		document.getElementById(COMPLETE_BOOK).append(book);

		deleteBook(bookId);
		const bookObject = book_object(bookId, bookTitle, bookAuthor, bookYear, true);

		books.push(bookObject);
		updateJson();
	})

	return action;
}

UndoAction = (bookId) => {
	const action = document.createElement("button");
	action.classList.add("button");
	action.innerText = "Belum Selesai";
	action.style.color = "white";

	action.addEventListener("click", function () {
		const book_itemParent = document.getElementById(bookId);

		const bookTitle = book_itemParent.querySelector("h3").innerText;
		const bookAuthor = book_itemParent.querySelectorAll("span")[0].innerText;
		const bookYear = book_itemParent.querySelectorAll("span")[1].innerText;

		book_itemParent.remove();

		const book = createBook(bookId, bookTitle, bookAuthor, bookYear, false);
		document.getElementById(INCOMPLETE_BOOK).append(book);

		deleteBook(bookId);
		const bookObject = book_object(bookId, bookTitle, bookAuthor, bookYear, false);

		books.push(bookObject);
		updateJson();
	})

	return action;
}

bookFilter = (keyword) => {
	const filter = keyword.toUpperCase();
	const judul = document.getElementsByTagName("h3");

	for (let i = 0; i < judul.length; i++) {
		const judulText = judul[i].textContent || judul[i].innerText;

		if (judulText.toUpperCase().indexOf(filter) > -1) {
			judul[i].closest(".book_item").style.display = "";
		} else {
			judul[i].closest(".book_item").style.display = "none";
		}
	}
}