import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Book } from '../../components'
import { search } from '../../BooksAPI'
import _ from 'lodash'

// const debouncedSearch = _.debounce(search, 1000)

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
    this.querySearch = _.debounce(this.querySearch.bind(this), 1000)
  }
  querySearch(q) {
    search(q, 30).then(res => {
      console.log(res)
      this.setState({
        searchResults: res.error ? [] : res
      })
    })
  }

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
              <Book book={item} key={item.id} shelf={item.shelf}/>
            )) : 'No Results'}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
