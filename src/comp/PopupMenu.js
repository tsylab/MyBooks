import React from 'react';

const PopupMenu = (props) => (
  <div className="book-shelf-changer">
    <select value={props.value} onChange={(event) => {props.onChange(event.target.value)}}>
    {
      props.options.map((option) => (
        <option
          key={option.id}
          value={option.value}
          disabled={option.disabled}
          className={option.value === props.value ? 'option-selected' : ''}
        >
          {option.name}
        </option>
      ))
    }
    </select>
  </div>
)

export default PopupMenu;