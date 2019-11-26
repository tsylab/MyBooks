import React from 'react';
import { Link } from 'react-router-dom'

/**
 * Button change route to /search
 */

const SearchButton = () => (
  <div className="open-search">
    <Link
      to='/search'>
        Add a book
    </Link>
  </div>
)

export default SearchButton;