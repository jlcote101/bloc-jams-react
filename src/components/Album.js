import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
      isMouseHover: -1,
      currentTime: 0,
      duration: album.songs[0].duration
    };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;

}

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.min(4, currentIndex +1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleTimeChange (e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

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
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
