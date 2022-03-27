//validasi local storage
let data_buku = localStorage.getItem("data_buku");
let data = [];
const BookDetail = {
    id: "",
    title: "",
    author: "",
    year: "",
    isComplete: false,
};
if (data_buku === null) {
    localStorage.setItem("data_buku", JSON.stringify(data));
}
const input_form = document.getElementById("inputBook");
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");

input_form.addEventListener("submit", function (event) {
    event.preventDefault();
    BookDetail.id = +new Date();
    BookDetail.title = inputBookTitle.value;
    BookDetail.author = inputBookAuthor.value;
    BookDetail.year = inputBookYear.value;
    BookDetail.isComplete = inputBookIsComplete.checked;

    let loop_list_buku = JSON.parse(localStorage.getItem("data_buku"));
    loop_list_buku.push(BookDetail);
    localStorage.setItem("data_buku", JSON.stringify(loop_list_buku));
    input_form.reset();
    let incompleteBookshelfList_variable = document.getElementById(
        "incompleteBookshelfList"
    );
    let completeBookshelfList_variable = document.getElementById(
        "completeBookshelfList"
    );
    incompleteBookshelfList_variable.innerHTML = "";
    completeBookshelfList_variable.innerHTML = "";
    book_pull();
    });

    incompleteBookshelfList = (bookTitle, penulis, tahun, id) => {

    let book_item = document.createElement("article");
    book_item.classList.add("book_item");
    let title = document.createElement("h3");
    let author = document.createElement("p");
    let year = document.createElement("p");
    let action = document.createElement("div");
    action.classList.add("action");
    let selesai = document.createElement("button");
    selesai.classList.add("green");
    let hapus = document.createElement("button");
    hapus.classList.add("red");
    hapus.onclick = function () {
        window.localStorage.removeItem('data_buku');
        window.location.reload();
    }
    let incompleteBookshelfList_variable = document.getElementById(
        "incompleteBookshelfList"
    );

    incompleteBookshelfList_variable.append(book_item);
    book_item.append(title);
    book_item.append(author);
    book_item.append(year);
    book_item.append(action);
    action.append(selesai);
    action.append(hapus);

    title.append(bookTitle);
    author.append(penulis);
    year.append(tahun);
    hapus.append("Hapus buku");
    selesai.append("Selesai dibaca");


    }
    // incompleteBookshelfList()

    completeBookshelfList = (bookTitle, penulis, tahun, id) => {
    let book_item = document.createElement("article");
    book_item.classList.add("book_item");
    let title = document.createElement("h3");
    let author = document.createElement("p");
    let year = document.createElement("p");
    let action = document.createElement("div");
    action.classList.add("action");
    let selesai = document.createElement("button");
    selesai.classList.add("green");
    let hapus = document.createElement("button");
    hapus.classList.add("red");
    let completeBookshelfList_variable = document.getElementById(
        "completeBookshelfList"
    );
    completeBookshelfList_variable.append(book_item);
    book_item.append(title);
    book_item.append(author);
    book_item.append(year);
    book_item.append(action);
    action.append(selesai);
    action.append(hapus);
    hapus.classList.add("red");
    hapus.onclick = function () {
        window.localStorage.removeItem('data_buku');
        window.location.reload();
    }

    title.append(bookTitle);
    author.append(penulis);
    year.append(tahun);
    hapus.append("Hapus buku");
    selesai.append("Belum selesai di Baca");
    }
    
    //fungsi view pada section sehingga looping new item
    book_pull = () => {
        let loop_list_buku = JSON.parse(localStorage.getItem("data_buku"));
    
        for (let i = 0; i < loop_list_buku.length; i++) {
            let title = loop_list_buku[i].title;
            let author = loop_list_buku[i].author;
            let year = loop_list_buku[i].year;
            let id = loop_list_buku[i].id;
            if (loop_list_buku[i].isComplete === true) {
            completeBookshelfList(title, author, year, id);
            } else {
            incompleteBookshelfList(title, author, year, id);
            }
        }
        }
book_pull();
