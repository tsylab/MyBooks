import React from 'react';
import PopupMenu from './PopupMenu'

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
      <PopupMenu options={props.popupOptions} value={props.bookInfo.shelf} onChange={(value) => (props.shelfChange(props.bookInfo.id, value))}></PopupMenu>
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

export default Book;
