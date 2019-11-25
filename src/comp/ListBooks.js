import React from 'react';
import Book from './Book'

const ListBooks = (props) => (
  <div className="bookshelf-books">
    <ol className="books-grid">
      {
        props.books.map((book) => (
          <li key={book.id}>
            <Book bookInfo={book} popupOptions={props.popupOptions} shelfChange={props.shelfChange}></Book>
          </li>
        ))
      }
    </ol>
  </div>
)

export default ListBooks;