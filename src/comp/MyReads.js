import React from 'react';
import Bookshelf from './Bookshelf'
import SearchButton from './SearchButton'

const MyReads = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>{props.title}</h1>
    </div>
    <div className="list-books-content">
      {
        props.shelves.map((shelf) => (
          <div key={shelf.id}>
            <Bookshelf
              title={shelf.title}
              icon={shelf.icon}
              books={props.books.filter((book) => (book.shelf === shelf.shelf)).sort((a, b) => { // books are sorted by title
                if (a.title > b.title) {
                  return 1;
                }
                if (b.title > a.title) {
                  return -1;
                }
                return 0;
              })}
              popupOptions={props.popupOptions}
              shelfChange={props.shelfChange}
            ></Bookshelf>
          </div>
        ))
      }
    </div>
    <SearchButton></SearchButton>
  </div>
)

export default MyReads;