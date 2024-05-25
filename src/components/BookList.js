import React from 'react';
import { Box } from '@mui/material';
import BookCard from './BookCard';

function BookList({ books, removeBook, updateRating }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {books.map((book, index) => (
        <BookCard
          key={index}
          book={book}
          removeBook={() => removeBook(index)}
          updateRating={(newValue) => updateRating(index, newValue)}
        />
      ))}
    </Box>
  );
}

export default BookList;
