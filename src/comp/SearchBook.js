import React from 'react';
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

/**
 * Search component with serach query input, close button and ListBooks as result
 * @prop launchSearch(query) - call search mehtod with query param
 * @prop closeSearch - call close search method
 * @prop searchResults - array of book descriptions, displayed in search results
 * @prop popupOptions - popup menu item list for search result elements
 * @prop addBook - on popup menu element select
 */

class SearchBook extends React.Component {
    static propTypes = {
      launchSearch: PropTypes.func.isRequired,
      closeSearch: PropTypes.func.isRequired,
      searchResults: PropTypes.array.isRequired,
      popupOptions: PropTypes.array.isRequired,
      addBook: PropTypes.func.isRequired,
    }
    state = {
        query: ''
    }

    /**
     * Fired on query input change.
     * Creates timeout with 0.5 sec delay, which calls launchSearch.
     * If timeout already exists, clears it first.
     * Overall, launch search after 0.5 sec of typing end
     * @param {*} value - search query
     */
    onQueryChange(value) {
      this.setState({
        query: value
      });
      // Search starts after 0.5 sec of typing end
      if (this.searchTimeoutId) {
        clearTimeout(this.searchTimeoutId);
      }

      this.searchTimeoutId = setTimeout(() => this.props.launchSearch(value), 500);
    }

    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.props.closeSearch}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.onQueryChange(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ListBooks books={this.props.searchResults} popupOptions={this.props.popupOptions} onChange={this.props.addBook}></ListBooks>
            </div>
          </div>
        )
    }
}

export default SearchBook;