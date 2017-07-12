import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Shelf} from '../../components'
import {getAll} from '../../BooksAPI'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    this.updateMyReadsData = this.updateMyReadsData.bind(this)
  }

  componentDidMount() {
    this.updateMyReadsData()
  }

  updateMyReadsData() {
   getAll().then(data => {
      console.log(data)
      this.setState({
        currentlyReading: data.filter(item => item.shelf === 'currentlyReading'),
        wantToRead: data.filter(item => item.shelf === 'wantToRead'),
        read: data.filter(item => item.shelf === 'read')
      })
    })
  }

  render() {
    const {currentlyReading, wantToRead, read} = this.state
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf type={'currentlyReading'} books={currentlyReading} onUpdate={this.updateMyReadsData}/>
            <Shelf type={'wantToRead'} books={wantToRead} onUpdate={this.updateMyReadsData}/>
            <Shelf type={'read'} books={read} onUpdate={this.updateMyReadsData}/>
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
