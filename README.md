# Book Inventory Manager

A web-based application to organize and manage a book collection. This project allows users to add, view, rate, and delete books from their inventory, integrating with the [Open Library API](https://openlibrary.org/developers/api) for fetching book details.

## Demo

You can view a demo of this project on [Vercel](https://book-inventory-manager-chi.vercel.app/).

## Installation

Make sure you have the following installed on your computer:
- Node.js (>=14.0.0)
- npm (>=6.0.0) or yarn (>=1.22.0)

Clone the repository:
```
git clone https://github.com/Adrian-Chambers/book-inventory-manager.git
cd book-inventory-manager
```

Install dependencies:
```
npm install
```

Run the application in development mode:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Features

- **Add books**: Add new books by entering the ISBN in the search field. The app fetches book details including the title, author, and cover image from the [Open Library API](https://openlibrary.org/developers/api).
- **View inventory**: Display a list of the books in your inventory with details such as the title, author, ISBN, and cover image.
- **Rate books**: Rate each book on a scale of 1 to 5 stars.
- **Delete books**: Remove books from your inventory by clicking the "delete" button next to a book.

## Project Structure

- `src/App.js`: Main component that sets up the layout and contains the core logic for fetching and displaying books.
- `src/components/`: Contains the reusable components used throughout the app.
- `src/hooks/useFetchData.js`: Custom hook to manage book data fetching and state.
- `src/utils`: Contains utility functions for API requests, database operations, and validation.
- `src/propTypes.js`: PropTypes definitions for type-checking.

## Technology Used

- [Create React App](https://create-react-app.dev/)
- [Open Library API](https://openlibrary.org/developers/api)
- [Material UI](https://mui.com/material-ui/)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [IndexedDB](https://www.npmjs.com/package/idb)
- [Yup](https://www.npmjs.com/package/yup)
