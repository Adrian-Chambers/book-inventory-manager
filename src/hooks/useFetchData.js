// src/hooks/useFetchBookDetails.js

import { fetchBookData, fetchAuthorData, fetchCoverData } from '../utils/api';
import { saveBooks } from '../utils/storage';
import { isValidISBN } from '../utils/validation';

export const useFetchData = (isbn, books, setBooks, setFetching, setIsbn, toast) => {
    // When "add book" button is clicked
    const addBook = async () => {
        // Check if ISBN field is empty
        if (!isbn) {
            toast.error("Please enter an ISBN.");
            return;
        }

        // Check if ISBN is valid
        const validationMessage = isValidISBN(isbn);
        if (validationMessage !== true) {
            toast.error(validationMessage);
            return;
        }

        // Check if book with same ISBN is already in list
        const existingBook = books.find((book) => book.isbn === isbn);
        if (existingBook) {
            toast.error("This book is already in your inventory.");
            return;
        }

        // Change "add book" button to an unclickable button that says "fetching..."
        setFetching(true);

        // Attempt to get book information using ISBN
        try {
            const bookData = await fetchBookData(isbn);

            // Cannot find book
            if (bookData.error === "notfound") {
                console.error("Cannot find book data.");
                toast.error("Cannot find book.");
                return;
            }

            // Set book title
            const bookTitle = bookData.title || "Unknown";

            // Attempt to get author information using author key
            const authorKey = bookData.authors?.[0]?.key || bookData.authors?.[0]?.author?.key;
            const authorData = authorKey ? await fetchAuthorData(authorKey) : { name: "Unknown" };
            const authorName = authorData.name || "Unknown";

            // Attempt to get book cover information using isbn
            const coverData = await fetchCoverData(isbn);
            const bookCover = coverData.source_url || "";

            // Create book object
            const book = { 
                title: bookTitle, 
                author: authorName, 
                isbn: isbn, 
                cover: bookCover, 
                rating: 0 
            };

            // Add book to list
            saveBooks([...books, book]);
            setBooks([...books, book]);
            toast.success("Book added.");
        } catch (error) {
            console.error("Error adding book: ", error.message);
            toast.error("Error adding book. Please try again.");
        } finally {
            setFetching(false);
            setIsbn('');
        }
    };

     // Remove a book from the list
    const removeBook = (index) => {
        // Display error message if index is out of bounds
        if (index < 0 || index >= books.length) {
            toast.error("Error removing book");
            console.log("Error removing book.");
            return;
        }

        // Update book list
        const newBooks = books.filter((book, i) => i !== index);
        saveBooks(newBooks);
        setBooks(newBooks);
        toast.success("Book removed");
    };

     // Update the rating of a book
    const updateRating = (index, newValue) => {
        // Display error message if index is out of bounds
        if (index < 0 || index >= books.length) {
            toast.error("Error updating rating");
            console.log("Error updating rating.");
            return;
        }

        // Update book list
        const newBooks = [...books];
        newBooks[index].rating = newValue;
        saveBooks(newBooks);
        setBooks(newBooks);
        toast.success("Updated book rating.");
    };

  return { addBook, removeBook, updateRating };
};
