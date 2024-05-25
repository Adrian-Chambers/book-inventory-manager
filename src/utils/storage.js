export const loadBooks = () => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  };
  
  export const saveBooks = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };
  