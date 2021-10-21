//npm
import {useState, useEffect} from 'react'

import BookContainer from "./BookContainer";
import Header from "./Header";
import Form from "./Form";

function App() {
const [books, setBooks] = useState([])
const [genres, setGenres] = useState([])
const [bookList, setBookList] = useState(books)
const [cart, setCart] = useState([])
const [visible, setVisible] = useState(true)
const [edit, setEdit] = useState(null)
const [formData, setFormData] = useState({
  title:'',
  author: '',
  genre: '',
  image: '',
  price: '',
  liked: false
}) 

//TODO: Create POST request to add book

//TODO: Create PATCH request to Update book

//TODO: Create Delete request to delete book

//useEffect  -> fetch (setsState) 
//during first mount
useEffect(()=> {
  fetch("http://localhost:4000/books")
  .then(res => res.json())
  .then(data => {
    setBooks(data)
    setBookList(data)
  })
  fetch("http://localhost:4000/genres")
  .then(res => res.json())
  .then(data => setGenres(data))
},[])

const postBooks = (book) => {
  fetch("http://localhost:4000/books",{
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(book)
  })
  .then(res => res.json())
  .then(data => {
    setBookList([data, ...bookList])
  })
}


const patchBooks = (book) => {
  fetch(`http://localhost:4000/books/${book.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(book)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    //Create a new array with map
    // const newBookList = bookList.map(bookListBook => {
    //   if(bookListBook.id === book.id){
    //     return data
    //   } else {
    //      return bookListBook
  //  }
    // }
    // })

    //Finding the index of the book that needs to be updated
    //We should not mutate state directly 
    const idx = bookList.findIndex(bookListBook => bookListBook.id === data.id)
    //Copy of our book list
    const bookListCopy = [...bookList]
    bookListCopy[idx] = data
    setBookList(bookListCopy)
  })
}

const deleteBook = (deletedBook) => {
  fetch(`http://localhost:4000/books/${deletedBook.id}`,{
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    const tempBooks = bookList.filter(book => book.id !== deletedBook.id)
    setBookList(tempBooks)
  })
}


//Cart
//useEffect updating state
useEffect(() => {
  if(cart.length > 0){
    alert(`${cart[cart.length-1].title} was added to cart`)
  }
},[cart])



//Form
//Handles form data
const handleChange = (e) => {
  console.log(formData)
  setFormData({...formData, [e.target.name]: e.target.value})
}


//Creates a book
const handleSubmit = (e) => {
  e.preventDefault()
  postBooks(formData)
}

//Edit Book
const populateForm = (book) => {
  setEdit(book)
  setFormData({
    title:book.title,
    author: book.author,
    genre: book.genre,
    image: book.image,
    price: book.price,
    liked: false
  })
}
//Update Form
const handleUpdateBook = (e) => {
  e.preventDefault()
  formData.id = edit.id
  patchBooks(formData)
}

//Updates a books like 
const handleLike = (book) => {
  const tempBook = {...book, liked: !book.liked}
  patchBooks(tempBook)

}


//Updates cart 
const addToCart = (book) => {
  setCart([...cart, book])
}

//Filters books 
const handleGenre = (genre) => {
  setBookList(books.filter(book => book.genre === genre))
}


  return (
    <div className="App" style={{textAlign:"center"}}>
      <Header cart={cart} storeName="Barnes and Flatiron" slogan="Live Love Code Bake Repeat"/>
      <button onClick={() => setVisible(!visible)}>{visible?"Hide Form":"Show Form"}</button>
     {visible?<Form formData={formData} handleChange={handleChange} handleSubmit={edit? handleUpdateBook:handleSubmit}/>:null}
      <br/>
      <BookContainer deleteBook={deleteBook} addToCart={addToCart} populateForm={populateForm} bookList={bookList} genreList={genres} handleGenre={handleGenre} handleLike={handleLike}/>
    </div>
  );
}

export default App;


