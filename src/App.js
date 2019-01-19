import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Homepage from './Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Link className="library-link"to='/Library'>Library</Link>
          <Route path='/homepage' component={Homepage}/>
          <Route path="/library" component={Library}/>
          <Route path="/album/:slug" component={Album}/>
        </main>
      </div>
    );
  }
}

export default App;
