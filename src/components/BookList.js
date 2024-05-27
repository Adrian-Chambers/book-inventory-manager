import React from 'react';
import { Box } from '@mui/material';
import BookCard from './BookCard';
import { bookListPropTypes } from '../propTypes';

function BookList({ books, removeBook, updateRating }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        overflow: 'scroll',
        pt: 4,
        pb: 4,
        width: '100%',
      }}>
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

BookList.propTypes = bookListPropTypes;

export default BookList;
