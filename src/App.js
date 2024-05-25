
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Button, Box, TextField } from '@mui/material';
import './App.css';
import BookList from './components/BookList';
import { loadBooks, saveBooks } from './utils/storage';
import { fetchBookData, fetchAuthorData, fetchCoverData } from './utils/api';
import { isValidISBN } from './utils/validation';
import ISBNForm from './components/ISBNForm';

function App() {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false)

  // Load books from local storage
  useEffect(() => {
    setBooks(loadBooks())
  }, [])

  // When "add book" button is clicked
  const addBook = async () => {
    // Placeholder values for book title, name, cover.
    let bookTitle = "Unknown";
    let authorName = "Unknown";
    let bookCover = "";

    // Check if ISBN field is empty
    if(!isbn){ 
      toast.error("Please enter an ISBN.")
      return;
    }

    // Check if ISBN is valid
    if(!isValidISBN(isbn)){
      toast.error("Invalid ISBN. Please try again.")
      return;
    }

    // Check if book with same ISBN is already in list
    const existingBook = books.find((book) => book.isbn === isbn);
    if (existingBook) {
      toast.error("This book is already in your inventory.");
      return;
    }

    // Change "add book" button to an unclickable button that says "fetching..."
    setFetching(true);

    // Attempt to get book information using ISBN
    try{
      const bookData = await fetchBookData(isbn);

      // Cannot find book information
      if(bookData.error === "notfound"){ 
        console.error("Cannot find book data.")
        toast.error("Cannot find book.")
        return;
      }

      // Set book title
      bookTitle = bookData.title || "Unknown";

      // Attempt to get author information using author key
      const authorKey = bookData.authors?.[0]?.key || bookData.authors?.[0]?.author?.key;
      
      try{
        const authorData = authorKey ? await fetchAuthorData(authorKey) : { name: "Unknown" };
        authorName = authorData.name || "Unknown";
      }
      catch(error){
        console.error("Error fetching author data: ", error.message);
          toast.error("Error fetching author data. Author information may be incomplete.")
      }

      // Attempt to get book cover using isbn
      try {
        const coverData = await fetchCoverData(isbn)
        bookCover = coverData.source_url || "";
      } catch (error) {
        console.error("Error fetching book cover: ", error.message);
        toast.error("Error fetching book cover. Information may be incomplete.")
      } 
      
      // Create book object
      const book = {
        title: bookTitle,
        author: authorName,
        isbn: isbn,
        cover: bookCover,
        rating: 0
      }

      // Add new book to list
      saveBooks([...books, book]);
      setBooks([...books, book]);
      toast.success("Book added.")

    } catch (error) {
      console.error("Error adding book: ", error.message)
      toast.error("Error adding book. Please try again.")
    } finally {
      setFetching(false);
    }

    // Reset ISBN field
    setIsbn(''); 

  }

  // Remove a book from the list
  const removeBook = (index) => {
    // Display error message if index is out of bounds
    if(index < 0 || index >= books.length){
      toast.error("Error removing book");
      console.log("Error removing book.");
      return;
    }

    const newBooks = books.filter((book, i) => i !== index);
    saveBooks(newBooks)
    setBooks(newBooks);
    toast.success("Book removed")
  }

  // Update the rating of a book
  const updateRating = (index, newValue) => {
    // Display error message if index is out of bounds
    if(index < 0 || index >= books.length){
      toast.error("Error updating rating");
      console.log("Error updating rating.");
      return;
    }

    const newBooks = [...books];
    newBooks[index].rating = newValue;
    saveBooks(newBooks);
    setBooks(newBooks);
    toast.success("Updated book rating.");
  }

  return (
  <>
    <ToastContainer />
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box 
        maxWidth="sm" 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2
        }}
      >
        <Typography component="div" variant="h3">Book Inventory Manager</Typography>
        
        <ISBNForm isbn={isbn} setIsbn={setIsbn} fetching={fetching} addBook={addBook} />

        <BookList 
          books={books} 
          removeBook={removeBook} 
          updateRating={updateRating}
        />
      </Box>
    </Box>
  </>
  );
}

export default App;
