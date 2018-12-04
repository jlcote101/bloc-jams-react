import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });


    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      currentSongIndex: -1,
      isMouseHover: -1
    };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;

}

  play(index) {
    this.audioElement.play();
    this.setState({isPlaying: true, currentSongIndex: index});
  };

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  };

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  };

  handleSongClick(song, index) {
    const isSameSong = this.state.currentSongIndex === index;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song);}
      this.play(index);
    }
  };

  onMouseEnter(index) {
    this.setState({ isMouseHover: index});
  };

  onMouseLeave() {
    this.setState({ isMouseHover: false});
  };

  renderIcon(song, index){
    if (this.state.isPlaying === true && this.state.currentSongIndex === index) {
      return <span className="ion-md-pause"/>
    }
    if (this.state.isMouseHover === index) {
      return <span className="ion-md-play"/>
    }
    else {
      return index +1
    }
  };


render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map((song, index) =>
                <tr className='song' key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.onMouseEnter(index)} onMouseLeave={() => this.onMouseLeave()}>
                  <td>{this.renderIcon(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
