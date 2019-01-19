import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {albums: albumData};
  }

  render() {
    return(
      <div className="library">
        <section className='library-content'>
          {
            this.state.albums.map( (album, index) =>
              <Link to={`/album/${album.slug}`} key={index}>
                <div className="row">
                  <div className="column">
                    <img src={album.albumCover} alt={album.title} />
                    <div className="album-info">Album: {album.title}</div>
                    <div className="album-info">Artist: {album.artist}</div>
                    <div className="album-info">Songs: {album.songs.length}</div>
                  </div>
                </div>
              </Link>
            )
          }
        </section>
      </div>
    );
  }
}

export default Library;
