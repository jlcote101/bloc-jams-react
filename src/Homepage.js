import React, {Component} from 'react';
import Library from './components/Library';
import './Homepage.css';

class Homepage extends Component {
  render (){
    return (
      <div className="homepage">
        <header>
          <h1 className="logo" to='/Library'>Bloc Jams</h1>
        </header>
        <body>

        </body>
      </div>
    )
  }
}

export default Homepage;
