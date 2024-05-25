import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const ISBNForm = ({ isbn, setIsbn, fetching, addBook }) => (
  <Box maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField variant="outlined" label="ISBN" value={isbn} onChange={(event) => setIsbn(event.target.value)} />
    {fetching ? 
      (<Button variant="contained" disabled>Fetching...</Button>)
      : (<Button variant="contained" onClick={addBook}>Add Book</Button>
    )}
  </Box>
);

export default ISBNForm;
