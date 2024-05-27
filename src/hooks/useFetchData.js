
import { useState } from 'react';
import { fetchBookData, fetchAuthorData, fetchCoverData } from '../utils/api';
import { saveBook, deleteBook } from '../utils/db';
import { validateISBN } from '../utils/validation';
import { toast } from 'react-toastify';

export const useFetchData = (initialBooks = []) => {
  const [books, setBooks] = useState(initialBooks);
  const [isbn, setIsbn] = useState('');
  const [fetching, setFetching] = useState(false);

  const addBook = async () => {
    if (!isbn) {
      toast.error("Please enter an ISBN.");
      return;
    }

    const validationMessage = validateISBN(isbn);
    if (validationMessage !== true) {
      toast.error(validationMessage);
      return;
    }

    const existingBook = books.find((book) => book.isbn === isbn);
    if (existingBook) {
      toast.error("This book is already in your inventory.");
      return;
    }

    setFetching(true);

    try {
      const bookData = await fetchBookData(isbn);
      if (bookData.error === "notfound") {
        toast.error("Cannot find book.");
        return;
      }

      const bookTitle = bookData.title || "Unknown";
      const authorKey = bookData.authors?.[0]?.key || bookData.authors?.[0]?.author?.key;
      const authorData = authorKey ? await fetchAuthorData(authorKey) : { name: "Unknown" };
      const authorName = authorData.name || "Unknown";
      const coverData = await fetchCoverData(isbn);
      const bookCover = coverData.source_url || "https://covers.openlibrary.org/b/isbn/" + isbn + ".jpg" || "";

      const book = { 
        title: bookTitle, 
        author: authorName, 
        isbn, 
        cover: bookCover, 
        rating: 0 
      };
      
      
      await saveBook(book);
      setBooks([...books, book]);
      toast.success("Book added.");
    } catch (error) {
      toast.error("Error adding book. Please try again.");
    } finally {
      setFetching(false);
      setIsbn('');
    }
  };

  const removeBook = async (index) => {
    if (index < 0 || index >= books.length) {
      toast.error("Error removing book");
      return;
    }

    try {
      const newBooks = books.filter((_, i) => i !== index);
      setBooks(newBooks);
      await deleteBook(books[index].isbn);
      toast.success("Book removed");
    } catch (error) {
      toast.error("Error removing book. Please try again.");
    }
  };

  const updateRating = (index, newValue) => {
    if (index < 0 || index >= books.length) {
      toast.error("Error updating rating");
      return;
    }

    try {
      const newBooks = [...books];
      newBooks[index].rating = newValue;
      saveBook(newBooks[index]);
      setBooks(newBooks);
      toast.success("Updated book rating.");
    } catch (error) {
      toast.error("Error updating rating.");
    }
  };

  return { books, isbn, fetching, setIsbn, addBook, removeBook, updateRating, setBooks };
};
