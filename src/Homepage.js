import React, {Component} from 'react';
import './Homepage.css';
import Library from './components/Library';
import { Route, Link } from 'react-router-dom';



class Homepage extends Component {
  render (){
    return (
      <div className="homepage">
        <header>
          <h1 className="logo" to='/Library'>Bloc Jams</h1>
        </header>
        <main>
          <Link className="library-link"to='/Library'>Library</Link>
          <Route path="/library" component={Library}/>
        </main>
      </div>
    )
  }
}

export default Homepage;
