import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types'

/**
 * List of Book components
 * @prop books - array of book description
 * @prop popupOptions - book popup menu item list
 * @prop onChange - on popup menu element select
 */

const ListBooks = (props) => (
  <div className="bookshelf-books">
    <ol className="books-grid">
      {
        props.books.map((book) => (
          <li key={book.id}>
            <Book bookInfo={book} popupOptions={props.popupOptions} onChange={props.onChange}></Book>
          </li>
        ))
      }
    </ol>
  </div>
)

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  popupOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ListBooks;