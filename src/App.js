
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Box } from '@mui/material';
import BookList from './components/BookList';
import ISBNForm from './components/ISBNForm';
import { useFetchData } from './hooks/useFetchData';
import { loadBooks } from './utils/db';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';


function App() {
  const { books, isbn, fetching, setIsbn, addBook, removeBook, updateRating, setBooks } = useFetchData([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const savedBooks = await loadBooks();
      setBooks(savedBooks);
    };
    fetchBooks();
  }, []);

  return (
    <ErrorBoundary>
    <ToastContainer />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 5,
          mb: 4,
        }}
      >
        <Typography
          component="div"
          variant="h3"
          sx={{
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            position: 'sticky', // Sticky position to keep it at the top
            top: 0, // Align to the top
            zIndex: 1, // Ensure it stays above other elements
          }}
        >
          Book Inventory Manager
        </Typography>

        <ISBNForm
          isbn={isbn}
          setIsbn={setIsbn}
          fetching={fetching}
          addBook={addBook}
        />
      </Box>

      <Box
        sx={{
          maxHeight: '70vh',
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <BookList
          books={books}
          removeBook={removeBook}
          updateRating={updateRating}
        />
      </Box>
    </Box>
    </ErrorBoundary>
  );
}

export default App;
