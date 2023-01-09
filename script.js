const allBooks=[

]

const addBookBtn=document.querySelector('.add')
const newBooks =document.querySelector('.new-books-container')
let title=document.getElementById('title')
const form=document.querySelector('.form')
let author=document.getElementById('author')

form.addEventListener('submit', (e)=>{
 e.preventDefault()

let from_localSt =  JSON.parse(window.localStorage.getItem('allBooks')) || []
from_localSt.forEach((book) => {
	if(book.title.value === title.value){
		title.value = book.title.value;
		author.value = book.author.value;
	}
});
	const newBook={
					title:title.value,
					author:author.value,
	}
	console.log(allBooks)
	allBooks.unshift(newBook)
	console.log(allBooks)
	from_localSt.unshift(newBook)
	window.localStorage.setItem('allBooks', JSON.stringify(from_localSt))

	newBooks.innerHTML = `<h2>title: ${newBook.title}</h2>
	<h2>Author: ${newBook.author}</h2>
	<button class="remove">Remove</button>`
	


})



