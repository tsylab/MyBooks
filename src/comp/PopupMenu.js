import React from 'react';
import PropTypes from 'prop-types'

/**
 * Popup menu
 * @prop value - selected value
 * @prop options - popup menu item list
 * @prop onChange - on popup menu element select
 */

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

PopupMenu.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PopupMenu;