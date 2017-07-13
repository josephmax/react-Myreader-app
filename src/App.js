import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import Home from './routes/Home'
import Search from './routes/Search'

import {getAll} from './BooksAPI'

class BooksApp extends Component {
  state = {
    books: []
  }

  updateMyReadsData = () => {
    getAll().then(data => {
      console.log(data)
      this.setState({
        books: data
      })
    })
  }

  componentDidMount () {
    this.updateMyReadsData()
  }

  render() {
    const { books } = this.state
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/" exact render={() => (
            <Home updateBook={this.updateMyReadsData} data={books} />
          )} />
          <Route path="/search" render={() => (
            <Search updateBook={this.updateMyReadsData} data={books} /> 
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
