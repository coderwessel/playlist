import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {activateNextTrack} from '../actions/tracklist'
import {setAudioStream, playAudioTrack, pauseAudioTrack, endAudioTrack} from '../actions/audio'
import {jobSucces} from '../actions/audiojobq'
import {setAudioPosition, setAudioDuration} from '../actions/audioposition'
import {
  LOAD_TRACK,
  START_PLAY,
  PAUSE_PLAY,
  RESUME_PLAY,
  // STOP_PLAY,
  SET_POSITION,
} from '../actions/audiojobq'
const PROGRESS_BAR_UPDATE_INTERVAL =
      (process.env.REACT_APP_PROGRESS_BAR_UPDATE_INTERVAL > 0) ?
          process.env.REACT_APP_PROGRESS_BAR_UPDATE_INTERVAL : 5

class AudioContainer extends Component {

  state = {lastUpdate:0  }

  updatePerSecond(){
    if (this.state.lastUpdate <= this.audio.currentTime - PROGRESS_BAR_UPDATE_INTERVAL) {
      this.setState({...this.state, lastUpdate: this.audio.currentTime})
      this.props.setAudioPosition(this.audio.currentTime)
    }
  }

  componentWillMount() {
    // super(props);
    // if (audio.loaded)
    this.audio = new Audio()
    // this.audio.ontimeupdate = (e) => {this.props.setAudioPosition(this.audio.currentTime)}
    this.audio.ontimeupdate = this.updatePerSecond.bind(this)
    // props.setAudioPosition(this.audio.currentTime)}
    this.audio.onended = (e) => {
      this.props.endAudioTrack()
      this.props.activateNextTrack()
    }
    // this.audio.durationchange = (e) => alert('durationchange')
    // // this.audio.loadedmetadata = (e) => this.props.setAudioDuration(this.audio.duration)
    // this.audio.loadstart = (e) => alert('loadstart')
    // this.audio.loadedmetadata = (e) => alert('loadedmetadata')
    // this.audio.loadeddata = (e) => alert('loadeddata')
    // this.audio.progress = (e) => alert('progress')
    // this.audio.canplay = (e) => alert('canplay')
    // this.audio.canplaythrough = (e) => alert('canplaythrough')
    // this.audio.pause = (e) => alert('paused')
    // this.audio.playing = (e) => alert(`playing: ${this.audio.duration}`)




    // this.audio.ontimeupdate = this.updateAudio(this.props.setAudioDuration, this.props.setAudioPosition)
  }
  // this.audio.play()// this.togglePlay = this.togglePlay.bind(this);

  // startPlay(){
  //   console.log('startplay')
    // const {tracklist} = this.props
    // const activeTrackIndex = tracklist.findIndex(track => track.active)
    // const activeTitle = tracklist[activeTrackIndex].title
    // const activeArtist = tracklist[activeTrackIndex].artist
    // if (activeTrackIndex !== -1 && (audio.artist != activeArtist || audio.title != activeTitle)) {
  //     this.props.setAudioStream(
  //                    {  title: activeTitle,
  //                        artist: activeArtist})
  //     this.audio.src = audio.source
  //     this.props.playAudioTrack()
  //   }
  //   if(audio.playing){this.audio.play()}
  //
  //   if(audio.resumeplay) {
  //     this.audio.currentTime = audio.position
  //     console.log(this.audio.currentTime)
  //     this.audio.play()
  //   }
  //   if(audio.paused) this.audio.pause()
  // }
  //
  // updatePosition(event){
  //   setAudioPosition(event.currentTime)
  // }

  render () {
    //onthouden voor load audio
    const {audiojobq} = this.props
    // const {tracklist} = this.props



    if (audiojobq.jobs.length>0){
      //{job, payload} = audiojobq.jobs[0]
      const job = audiojobq.jobs[0].job
      const payload = audiojobq.jobs[0].payload
      this.setState({...this.state, lastUpdate: 0})
      switch (job){
      case LOAD_TRACK:
        //{artist,title} = job.payload
        const artist = payload.artist
        const title = payload.title
        const streamquery="/?play="
        const streamURL= process.env.REACT_APP_STREAM_HOST
                            + streamquery+artist.replace(/[^a-zA-Z0-9 ]/g, " ")+" "
                               +title.replace(/[^a-zA-Z0-9 ]/g, " ")
        console.log(`load ${streamURL}`)
        this.audio.src = streamURL
        this.props.setAudioStream({artist: artist, title: title})

        setTimeout(
            function() {
                this.props.setAudioDuration(this.audio.duration)
            }
            .bind(this),
            3000
        )


        // setTimeout(
        //   // alert("Hello");
        //   // this.props.setAudioDuration(this.audio.duration)
        //   this.props.setAudioDuration(50)
        //          , 10000)
        // this.props.setAudioDuration(this.audio.duration)
        this.props.jobSucces()

        break

      case START_PLAY:
        this.audio.play()
        this.props.playAudioTrack() // hmmmm
        this.props.jobSucces()
        break

      case PAUSE_PLAY:
        this.audio.pause()
        this.props.pauseAudioTrack()
        this.props.jobSucces()
        break

      case RESUME_PLAY:
        this.audio.currentTime = this.state.resumePosition
        this.audio.play()
        this.props.playAudioTrack()
        this.props.jobSucces()
        break

      case SET_POSITION:
        // this.audio.pause()

        this.audio.currentTime = payload
        this.setState({...this.state, lastUpdate: 0})
        setAudioPosition(payload)
        // this.audio.play()
        // this.props.playAudioTrack()
        this.props.jobSucces()

        break

      default:
      break
      }
    }
    return (<div></div>)

  }
}



//redux
const mapStateToProps = function (state) {
  return {
    tracklist: state.tracklist,
    audiojobq: state.audiojobq
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default connect(mapStateToProps,
  { activateNextTrack, setAudioStream, playAudioTrack,
      pauseAudioTrack, endAudioTrack, setAudioPosition, setAudioDuration, jobSucces}
)(AudioContainer)
