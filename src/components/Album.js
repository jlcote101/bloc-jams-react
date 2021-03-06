import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

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
      duration: album.songs[0].duration,
      currentVolume: .5,

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
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange)
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
    console.log(isSameSong, this.state.isPlaying)
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
    if ( this.state.currentSongIndex === index) {
      if (this.state.isPlaying === true){
        return <span className="ion-md-pause"/>
      }
      else {
        return <span className="ion-md-play"/>
      }
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
  this.play(newIndex);
}

handleNextClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = currentIndex === this.state.album.songs.length - 1 ? 0 : Math.min(this.state.album.songs.length -1, currentIndex +1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play(newIndex);
}

handleTimeChange (e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

handleVolumeChange(e){
   const newVolume = e.target.value;
   this.audioElement.volume = newVolume;
   this.setState({currentVolume: newVolume});
}

formatTime (seconds) {
  if (isNaN(seconds) || seconds === 0){
    return "--:--"
  }
  const minutes = Math.round(seconds / 60);
  const second = Math.round(seconds % 60);
  if (second < 10) {
    return (minutes + ":0" + second)
  } else {
    return (minutes + ":" + second);
  }
}


render() {
    return (
      <section className="album"
          style={{backgroundImage: 'url(' + this.state.album.albumCover + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  position: 'relative',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100vh',
                  }}>
        <section className="album-information">
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>


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
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
            )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong, this.state.currentSongIndex)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />
                  </div>
        </section>
      </section>
    );
  }
}

export default Album;
