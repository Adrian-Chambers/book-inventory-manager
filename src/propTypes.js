
import PropTypes from 'prop-types';

export const bookPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  cover: PropTypes.string,
  rating: PropTypes.number,
});

export const booksPropType = PropTypes.arrayOf(bookPropType);

export const isbnFormPropTypes = {
  isbn: PropTypes.string.isRequired,
  setIsbn: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  addBook: PropTypes.func.isRequired,
};

export const bookCardPropTypes = {
  book: bookPropType.isRequired,
  removeBook: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired,
};

export const bookListPropTypes = {
  books: booksPropType.isRequired,
  removeBook: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired,
};

export const errorBoundaryPropTypes = {
  children: PropTypes.node.isRequired,
};
