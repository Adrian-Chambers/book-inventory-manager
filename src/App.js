
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Card, CardMedia, CardContent, Button, Box, TextField, Rating } from '@mui/material';
import './App.css';

function App() {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false)

  // Load books from local storage
  useEffect(() => {
    const savedBooks = localStorage.getItem('books')
    if(savedBooks){
      setBooks(JSON.parse(savedBooks))
    }
  }, [])

  // Save books to local storage
  const saveToLocalStorage = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

  // Check if ISBN is valid. Must be 10 or 13 numbers.
  const isValidISBN = (isbn) => {
    const cleanIsbn = isbn.replace(/-/g, '');
    if (cleanIsbn.length === 10) {
      return /^\d{9}[\dX]$/.test(cleanIsbn);
    } else if (cleanIsbn.length === 13) {
      return /^\d{13}$/.test(cleanIsbn);
    }
    return false;
  };

  // When "add book" button is clicked.
  const addBook = async () => {
    // ISBN field empty
    if(!isbn){ 
      toast.error("Please enter an ISBN.")
      return;
    }

    // Check if ISBN is valid
    if(!isValidISBN(isbn)){
      toast.error("Please enter a valid ISBN.")
      return;
    }

    // Change "add book" button to an unclickable button that says "fetching..."
    setFetching(true);

    try{

      // Attempt to get book information using ISBN
      const bookRes = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      const bookData = await bookRes.json();

      // Cannot find book information
      if(!bookData || bookData.error === "notfound"){ 
        console.error("Cannot find book data.")
        toast.error("Cannot find book information.")
        return;
      }

      let authorKey;
      let authorData = [];

      // Cannot find book authors
      if(!bookData.authors){
        console.error("Cannot find author data.")
        authorData.name = "Unknown"
      }
      // Can find book authors
      else{
        if (bookData.authors[0]?.author?.key) {
          authorKey = bookData.authors[0].author.key;
        } else if (bookData.authors[0]?.key) {
          authorKey = bookData.authors[0].key;
        } 
        else {  // Cannot find author key
          console.error("Author key not found in book data.");
          authorData.name = "Unknown"
        }

        // Attempt to retrieve author information using author key
        const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`)
        authorData = await authorRes.json();
      }

      // Get book title. If there is none, set to "Unknown".
      const bookTitle = bookData.title ? bookData.title : "Unknown";

      // Get author name. If there is none, set to "Unknown".
      const authorName = authorData.name ? authorData.name : "Unknown";

      // Get book cover link. If there is none, set link to empty string.
      const bookCover = bookData.covers ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg` : "";
      
      // Create book object
      const book = {
        title: bookTitle,
        author: authorName,
        isbn: isbn,
        cover: bookCover,
        rating: 0
      }

      // Set books
      const newBooks = [...books, book]
      setBooks(newBooks)
      saveToLocalStorage(newBooks)
      toast.success("Book added.")

    } catch (error) {
      console.error("Error adding book: ", error.message)
      toast.error("Error adding book.")
    } finally {
      setFetching(false);
    }

    // Reset ISBN field
    setIsbn(''); 

  }

  const removeBook = (index) => {
    const newBooks = books.filter((book, i) => i !== index);
    setBooks(newBooks);
    saveToLocalStorage(newBooks)
    toast.success("Book removed.")
  }

  const updateRating = (index, newValue) => {
    const newBooks = [...books];
    newBooks[index].rating = newValue;
    setBooks(newBooks);
    saveToLocalStorage(newBooks)
    toast.success("Updated book rating.")
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
        
        <TextField 
          variant="outlined"
          label="ISBN"
          value={isbn}
          onChange={ (event) => setIsbn(event.target.value)}
        >ISBN</TextField>

        {fetching ? 
          (
            <Button 
              variant="contained"
            >Fetching...</Button>
          ) : (
            <Button 
              variant="contained"
              onClick={addBook}
              
            >Add Book</Button>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
          {books.map((book, index) => (
            <Card key={book.id} sx={{ display: 'flex', mb: 2}}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={book.cover}
              alt={book.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent>

                <Typography component="div" variant="h6">
                  {book.title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Author: {book.author}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" component="div">
                  ISBN: {book.isbn}
                </Typography>

                <Rating
                  value={book.rating}
                  onChange={(event, newValue) => updateRating(index, newValue)}
                />

              </CardContent>

              <Box sx={{ display: 'flex', p: 2 }}>
                <Button variant="contained" color="error" onClick={() => removeBook(index)}>Delete</Button>
              </Box>

            </Box>
          </Card>
          ))}
        </Box>
      </Box>
    </Box>
  </>
  );
}

export default App;
