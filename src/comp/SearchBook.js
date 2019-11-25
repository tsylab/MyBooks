import React from 'react';
import ListBooks from './ListBooks'

class SearchBook extends React.Component {
    state = {
        query: ''
    }

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
              <ListBooks books={this.props.searchResults} popupOptions={this.props.popupOptions} shelfChange={this.props.addBook}></ListBooks>
            </div>
          </div>
        )
    }
}

export default SearchBook;