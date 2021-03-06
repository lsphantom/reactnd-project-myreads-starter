import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class BookSearch extends Component {
  static propTypes = {
    onBookChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }
  componentDidMount() {
    this.setState({
      books: this.props.books
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query})
    this.props.BookSearch(query)
  }

  render(){
    const { books } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query.trim()), 'i')
      showingBooks = books.filter( (author) => match.test(author.authors) || match.test(author.title) )
    } else {
      showingBooks = []
    }

    showingBooks.sort(sortBy('name'))

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => (this.updateQuery(event.target.value))}
            />

          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
        {showingBooks.map((book, index) => (
          <Book book={book} shelf={book.shelf} key={index} onChange={(shelf) => {
              this.props.onBookChange(book, shelf)
            }} />
        ))}
        </ol>
        </div>
      </div>
    )
  }
}


export default BookSearch
