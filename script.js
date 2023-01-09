const addBookBtn = document.querySelector('.add')
const newBooks =document.querySelector('.new-books-container')
let title = document.getElementById('title')
const form = document.querySelector('.form')
let author=  document.getElementById('author')
const list = document.querySelector('.wishList')


let local_storage =  JSON.parse(window.localStorage.getItem('allBooks'))
if(local_storage === null || local_storage === undefined || local_storage.length === 0 ){
	local_storage = []
}

let allBooks = local_storage

/* render each book */ 
allBooks.forEach((book, index) => {
	const displayBook = `
	<div class="book-container">
		<p class="book-title">title: ${book.title}</p>
		<p class="book-author">Author: ${book.author}</p>
		<button class="remove" id=${index}>Remove</button>
	</div>
	`
	newBooks.innerHTML += displayBook;
})

const bookExist = (existiingTitle, newTitle) => {
	return JSON.stringify(existiingTitle) === JSON.stringify(newTitle)
}

/* add book */ 
const addBook = () => {
	let newBook = {
		title: title.value,
		author: author.value,
	}
	/* check if book exist */ 
	let exist = false;
	local_storage.forEach((book) => {
		if(bookExist(book.title, title.value)){
			exist = true
			console.log('book exist')
		}
	});

	/* Dont add if book exist */ 
	if (exist) return 

	/* add book if it doesn't exist already */ 
	else {
		allBooks.unshift(newBook)
		window.localStorage.setItem('allBooks', JSON.stringify(local_storage))
	}
	setTimeout(update, 0)
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()
	addBook()		
})

/* remove book */ 
function remove (buttonId) {
	allBooks = local_storage.filter((book, index) => index != buttonId)
	window.localStorage.setItem('allBooks', JSON.stringify(allBooks))
	setTimeout(update, 0)
}
const bookBtns = document.querySelectorAll(".remove");
bookBtns.forEach((bookBtn) => {
	bookBtn.addEventListener('click', (e)=>{
		buttonId = e.target.getAttribute('id')
		remove(buttonId)
	})
})

// window.localStorage.setItem('allBooks', JSON.stringify(allBooks))