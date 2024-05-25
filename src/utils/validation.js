// Yup is a schema builder for value parsing and validation
import * as Yup from 'yup';

export const isValidISBN = (isbn) => {
  const schema = Yup.string().test('is-isbn', 'Invalid ISBN', value => {
    
    if (!value) return false;
    
    // Remove any hyphens
    const cleanIsbn = value.replace(/-/g, '');

    // Check if 9 digits. 10th character can be digit or 'X'.
    if (cleanIsbn.length === 10) {
      return /^\d{9}[\dX]$/.test(cleanIsbn);
    } 
    // Check if 13 digits
    else if (cleanIsbn.length === 13) {
      return /^\d{13}$/.test(cleanIsbn);
    }

    return false;
  });
  
  try {
    schema.validateSync(isbn);
    return true;
  } catch (error) {
    return error.message;
  }
};
