export const isValidISBN = (isbn) => {
    const cleanIsbn = isbn.replace(/-/g, '');
    if (cleanIsbn.length === 10) {
      return /^\d{9}[\dX]$/.test(cleanIsbn);
    } else if (cleanIsbn.length === 13) {
      return /^\d{13}$/.test(cleanIsbn);
    }
    return false;
  };
  