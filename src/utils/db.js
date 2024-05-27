
import { openDB } from 'idb';

const DB_NAME = 'bookInventory';
const STORE_NAME = 'books';

const handleDBError = (error, action) => {
  console.error(`Failed to ${action}:`, error);
  throw new Error(`Failed to ${action}`);
};

// Initialize the database
const initDB = async () => {
  try {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'isbn' });
        }
      },
    });
  } catch (error) {
    handleDBError(error, 'initialize database');
  }
};

// Save a book
export const saveBook = async (book) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put(book);
    await tx.done;
  } catch (error) {
    handleDBError(error, 'save book');
  }
};

// Load all books
export const loadBooks = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const allBooks = await store.getAll();
    await tx.done;
    return allBooks;
  } catch (error) {
    handleDBError(error, 'load books');
  }
};

// Delete a book
export const deleteBook = async (isbn) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.delete(isbn);
    await tx.done;
  } catch (error) {
    handleDBError(error, 'delete book');
  }
};
