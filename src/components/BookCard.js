import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating } from '@mui/material';

const BookCard = ({ book, removeBook, updateRating }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2}}>
            
            <CardMedia component="img" sx={{ width: 151 }} image={book.cover} alt={book.title} />
            
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

                <Rating value={book.rating} onChange={(event, newValue) => updateRating(newValue)} />

              </CardContent>

              <Box sx={{ display: 'flex', p: 2 }}>
                <Button variant="contained" color="error" onClick={removeBook}>Delete</Button>
              </Box>

            </Box>
          </Card>
  );
};

export default BookCard;
