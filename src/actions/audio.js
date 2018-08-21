import store from '../store'

export const UPDATE_SOURCE = 'UPDATE_SOURCE'
export const PLAY_AUDIO_TRACK = 'PLAY_AUDIO_TRACK'
export const PAUSE_AUDIO_TRACK = 'PAUSE_AUDIO_TRACK'
export const RESUME_AUDIO_TRACK = 'PAUSE_AUDIO_TRACK'
export const SET_AUDIO_POSITION = 'SET_AUDIO_POSITION'
export const SET_AUDIO_DURATION = 'SET_AUDIO_DURATION'
export const END_AUDIO_TRACK = 'END_AUDIO_TRACK'

export function setAudioStream({artist: artist, title: title}) {
	const streamquery="/?play="
	const streamURL= process.env.REACT_APP_STREAM_HOST+streamquery+artist.replace(/[^a-zA-Z0-9 ]/g, " ")+" "+title.replace(/[^a-zA-Z0-9 ]/g, " ")
    console.log(streamURL)
  return function (dispatch){
    dispatch({
      type: UPDATE_SOURCE,
      payload: {source: streamURL, artist:artist, title: title}
    })
  }
}

export function playAudioTrack(){
  return function (dispatch){
		const actiontype=(store.getState().audio.paused)?RESUME_AUDIO_TRACK:PLAY_AUDIO_TRACK
		dispatch({
      type: actiontype
    })
  }
}

export function pauseAudioTrack(){
  return function (dispatch){
    dispatch({
      type: PAUSE_AUDIO_TRACK
    })
  }
}


export function endAudioTrack(){
  return function (dispatch){
    dispatch({
      type: END_AUDIO_TRACK
    })
  }
}

export function setAudioPosition(pos,dur){
  return function (dispatch){
    dispatch({
      type: SET_AUDIO_POSITION,
      payload: pos
    })
		dispatch({
      type: SET_AUDIO_DURATION,
      payload: dur
    })
  }
}

export function setAudioDuration(msec){
  return function (dispatch){
    dispatch({
      type: SET_AUDIO_DURATION,
      payload: msec
    })
  }
}
