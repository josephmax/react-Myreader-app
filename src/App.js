import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import Home from './routes/Home'
import Search from './routes/Search'

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/" exact component={Home}></Route>
          <Route path="/search" component={Search}/> 
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
