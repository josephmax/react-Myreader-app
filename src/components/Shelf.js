import React from 'react'
import {Book} from './index'
import PropTypes from 'prop-types'

const TYPE2TITLE = {
  'currentlyReading': 'Currently Reading',
  'wantToRead': 'Want To Read',
  'read': 'Read'
}
const Shelf = (props) => {
  const {children, type, books, onUpdate} = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{TYPE2TITLE[type]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(item => <Book book={item} onUpdate={onUpdate} shelf={type} key={item.id}/>)
          }
        </ol>
      </div>
      {children}
    </div>
  )
}

Shelf.PropTypes = {
  children: PropTypes.element,
  type: PropTypes.string,
  books: PropTypes.array,
  onUpdate: PropTypes.function
}

export default Shelf
