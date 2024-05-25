
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Box } from '@mui/material';
import BookList from './components/BookList';
import ISBNForm from './components/ISBNForm';
import { loadBooks } from './utils/storage';
import { useFetchData } from './hooks/useFetchData';
import './App.css';

function App() {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false)

  // Load books from local storage
  useEffect(() => {
    setBooks(loadBooks())
  }, [])

  // Get functions for adding books, removing books, and updating rating
  const { addBook, removeBook, updateRating } = useFetchData(isbn, books, setBooks, setFetching, setIsbn, toast);

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
