import React from 'react';
import PropTypes from 'prop-types'
import PopupMenu from './PopupMenu'

/**
 * Book represented with cover image, title, authors and popup menu
 * @prop bookInfo - book description
 * @prop popupOptions - popup menu item list
 * @prop onChange - on popup menu element select
 */

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
          backgroundImage: (props.bookInfo.imageLinks && props.bookInfo.imageLinks.thumbnail) ? `url("${props.bookInfo.imageLinks.thumbnail}")` : 'none'
        }}
      ></div>
      <PopupMenu
        options={props.popupOptions}
        value={props.bookInfo.shelf}
        onChange={(value) => (props.onChange(props.bookInfo.id, value))}
      />
      {props.bookInfo.bookIcon && (
        <div className="book-icon">
          <i className={props.bookInfo.bookIcon}></i>
        </div>
      )}
    </div>
    <div className="book-title">{props.bookInfo.title ? props.bookInfo.title : '---No Title---'}</div>
    <div className="book-authors">{props.bookInfo.authors ? props.bookInfo.authors.join(', ') : ''}</div>
  </div>
)

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  popupOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Book;
