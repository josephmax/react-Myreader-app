import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Shelf} from '../../components'
import PropTypes from 'prop-types'

class Home extends Component {
  PropTypes = {
    data: PropTypes.array.isRequired,
    updateBook: PropTypes.func
  }

  filterShelf = (data) => {
    return {
      currentlyReading: data.filter(item => item.shelf === 'currentlyReading'),
      wantToRead: data.filter(item => item.shelf === 'wantToRead'),
      read: data.filter(item => item.shelf === 'read')
    }
  }

  render() {
    const { updateBook, data } = this.props
    const { currentlyReading, wantToRead, read } = this.filterShelf(data)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf type={'currentlyReading'} books={currentlyReading} onUpdate={updateBook}/>
            <Shelf type={'wantToRead'} books={wantToRead} onUpdate={updateBook}/>
            <Shelf type={'read'} books={read} onUpdate={updateBook}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
