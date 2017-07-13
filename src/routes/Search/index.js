import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Book } from '../../components'
import { search } from '../../BooksAPI'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Search extends Component {
  PropTypes = {
    updateBook: PropTypes.func.isRequired,
    data: PropTypes.array
  }
  defaultProps = {
    data: []
  }
  state = {
    searchResults: []
  }

  querySearch = _.debounce(q => {
    if (!q) return
    search(q, 30).then(res => {
      this.setState({
        searchResults: res.error ? [] : res
      })
    })
  }, 500)

  isBookOnShelf = book => {
    const { data } = this.props
    let shelf = 'none'
    data.forEach(item => {
      if (item.id === book.id) {
        shelf = item.shelf
        return
      }
    })
    return shelf
  }

  updateBook = _.throttle(this.props.updateBook, 500)

  render() {
    const { searchResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={e => this.querySearch(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length > 0 ? searchResults.map(item => (
              <Book book={item} key={item.id} 
              onUpdate={this.updateBook} shelf={this.isBookOnShelf(item)}/>
            )) : 'No Results'}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
