import React from 'react';
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

/**
 * Book shelf with title, icon and list of book description
 * @prop title - shelf title
 * @prop icon - shelf icon
 * @prop books - array of book description
 * @prop popupOptions - book popup menu item list
 * @prop shelfChange - on popup menu element select
 */

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {props.title}
      {props.icon && (<i className={props.icon}></i>)}
    </h2>
    <ListBooks books={props.books} popupOptions={props.popupOptions} onChange={props.shelfChange}></ListBooks>
  </div>
)

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  books: PropTypes.array.isRequired,
  popupOptions: PropTypes.array.isRequired,
  shelfChange: PropTypes.func.isRequired,
}

export default Bookshelf;