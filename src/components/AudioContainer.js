import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {activateNextTrack} from '../actions/tracklist'
import {setAudioStream, playAudioTrack, pauseAudioTrack, endAudioTrack, setAudioPosition, setAudioDuration} from '../actions/audio'



class AudioContainer extends Component {

  constructor(props) {


    super(props);
    const {tracklist} = this.props
    const {audio} = this.props
    const activeTrackIndex = tracklist.findIndex(track => track.active)
     // no audio loaded and an active streamconst active
     // no audio loaded and an active stream
    if (!audio.loaded && activeTrackIndex !== -1) this.props.setAudioStream(
                     {  title: tracklist[activeTrackIndex].title,
                         artist: tracklist[activeTrackIndex].artist})

    // if (audio.loaded)
    this.audio = new Audio()
  }
  // this.audio.play()// this.togglePlay = this.togglePlay.bind(this);

  startPlay(){
    const {tracklist} = this.props
    const {audio} = this.props
    const activeTrackIndex = tracklist.findIndex(track => track.active)
    if (!audio.loaded && activeTrackIndex !== -1) this.props.setAudioStream(
    // if (activeTrackIndex !== -1) this.props.setAudioStream(
                     {  title: tracklist[activeTrackIndex].title,
                         artist: tracklist[activeTrackIndex].artist})
    this.audio.src= audio.source
    if(!audio.playing) this.audio.play()

  }

  componentDidMount() {
    const {tracklist} = this.props
    const {audio} = this.props

  }

  updatePosition(event){
    setAudioPosition(event.currentTime)
  }

  render () {
// if (this.audio.src==='')
    this.startPlay()
    return <div></div>
  }
  // render () {
  //   const {tracklist} = this.props
  //   const {audio} = this.props
  //
  //   return (<div>
  //           <audio src={audio.source} controls ontimeupdate={this.updatePosition}/>
  //     </div>
  //   )
  // }
  //
}


//redux
const mapStateToProps = function (state) {
  return {
    tracklist: state.tracklist,
    audio: state.audio
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default connect(mapStateToProps,
  { activateNextTrack, setAudioStream, playAudioTrack, pauseAudioTrack, endAudioTrack, setAudioPosition, setAudioDuration}
)(AudioContainer)
