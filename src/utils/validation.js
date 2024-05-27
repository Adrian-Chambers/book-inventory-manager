// Yup is a schema builder for value parsing and validation
import * as Yup from 'yup';

export const isbnSchema = Yup.string().test('is-isbn', 'Invalid ISBN. ISBN must be 10 or 13 digits.', value => {
  if (!value) return false;
  const cleanIsbn = value.replace(/-/g, '');
  if (cleanIsbn.length === 10) {
    return /^\d{9}[\dX]$/.test(cleanIsbn);
  } else if (cleanIsbn.length === 13) {
    return /^\d{13}$/.test(cleanIsbn);
  }
  return false;
});

export const validateISBN = (isbn) => {
  try {
    isbnSchema.validateSync(isbn);
    return true;
  } catch (error) {
    return error.message;
  }
};