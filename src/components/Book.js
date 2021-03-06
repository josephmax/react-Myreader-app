import React from 'react'
import PropTypes from 'prop-types'
import {update} from '../BooksAPI'

const Book = (props) => {
  const {book, shelf, onUpdate} = props
  const {imageLinks, title, authors} = book
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks ? imageLinks.smallThumbnail : ''})`
          }}></div>
          <div className="book-shelf-changer">
            <select
              value={shelf || 'none'}
              onChange={e => update(book, e.target.value).then(onUpdate && onUpdate())}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors
          ? authors.map(item => <div className="book-authors" key={item}>{item}</div>)
          : null}
      </div>
    </li>
  )
}
Book.PropTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string,
  onUpdate: PropTypes.function
}

export default Book
