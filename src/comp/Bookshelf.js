import React from 'react';
import ListBooks from './ListBooks'

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {props.title}
      {props.icon && (<i className={props.icon}></i>)}
    </h2>
    <ListBooks books={props.books} popupOptions={props.popupOptions} shelfChange={props.shelfChange}></ListBooks>
  </div>
)

export default Bookshelf;