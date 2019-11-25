import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import MyReads from './comp/MyReads'
import SearchBook from './comp/SearchBook'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    searchResults: []
  }
  // Describes shelves list of MyBooks. Icon - is className of Font Awesome icon library (v.5.2.0 free)
  shelves = [
    { id: 1, title: 'Currently Reading', shelf: 'currentlyReading', icon: 'fas fa-book-reader' },
    { id: 2, title: 'Want to Read', shelf: 'wantToRead', icon: 'fas fa-grin-stars' },
    { id: 3, title: 'Read', shelf: 'read', icon: 'fas fa-book'}
  ];

  // Array of popup actions for book
  popupOptions = [
    { id: 0, name: 'Move to...', value: 'move', disabled: true },
    { id: 1, name: 'Currently Reading', value: 'currentlyReading' },
    { id: 2, name: 'Want to Read', value: 'wantToRead' },
    { id: 3, name: 'Read', value: 'read' },
    { id: 4, name: 'None', value: 'none' }
  ]

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState({ myBooks: books });
      }
    )
  }

  updateShelves(bookId, shelfValue) {
    BooksAPI.update({ id: bookId }, shelfValue).then((shelvesInfo) => {
      if (!shelvesInfo || shelvesInfo.error) {
        this.loadBooks();
        alert('Oooooops :( Some server error...');
      }
    });
  }

  shelfChange(bookId, shelfValue) {
    if (bookId && shelfValue) {
    /*BooksAPI.update({ id: bookId }, shelfValue).then((el) => {
      this.loadBooks();
    });*/
      this.updateShelves(bookId, shelfValue);
      this.setState((currState) => {
        if (shelfValue === 'none') {
          return {
            myBooks: currState.myBooks.filter((book) => (book.id !== bookId))
          }
        } else {
          return {
            myBooks: currState.myBooks.map((book) => {
              if (bookId === book.id) {
                const bookOnNewShelf = {...book};
                bookOnNewShelf.shelf = shelfValue;
                return bookOnNewShelf;
              } else {
                return book;
              }
            })
          }
        }
      });
    }
  }

  launchSearch(value) {
    if (value) {
      BooksAPI.search(value).then((books) => {
        if (!books || books.error) books = [];
        books = books.map((book) => {
          const inLibraryBook = this.state.myBooks.find((myBook) => (myBook.id === book.id));
          if (inLibraryBook && inLibraryBook.shelf) {
            book.shelf = inLibraryBook.shelf;
            book.bookIcon = this.shelves.find((shelf) => (shelf.shelf === book.shelf)).icon;
          } else {
            book.shelf = 'none';
          }
          return book;
        })
        this.setState({
          searchResults: books
        });
      })
    } else {
      this.setState({
        searchResults: []
      });
    }
    clearTimeout(this.searchTimeoutId);
  }

  closeSearch(history) {
    //Clean search results
    this.setState({
      searchResults: []
    })
    // Load my books library and back to main route
    BooksAPI.getAll().then(
      (books) => {
        this.setState({ myBooks: books });
        history.push('/');
      }
    )
  }

  addBook(bookId, shelfValue) {
    if (bookId && shelfValue) {
      this.setState((currState) => {
        let newBook = null;
        const searchResults = [...currState.searchResults].map((book) => {
          if (book.id === bookId) {
            newBook = {...book};
            newBook.shelf = shelfValue;
            const shelf = this.shelves.find((shelf) => (shelf.shelf === shelfValue));
            newBook.bookIcon = (shelf && shelf.icon) ? shelf.icon : null;
            return newBook;
          } else {
            return book;
          }
        });
        if (newBook) {
          this.updateShelves(bookId, shelfValue);
          return {
            searchResults: searchResults,
            myBooks: [...currState.myBooks, newBook]
          }
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads
            title="MyReads"
            shelves={this.shelves}
            books={this.state.myBooks}
            popupOptions={this.popupOptions}
            shelfChange={(bookId, shelfValue) => (this.shelfChange(bookId, shelfValue))}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook
            searchResults={this.state.searchResults}
            launchSearch={(value) => this.launchSearch(value)}
            popupOptions={this.popupOptions}
            closeSearch={() => this.closeSearch(history)}
            addBook={(bookId, shelfValue) => (this.addBook(bookId, shelfValue))}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
