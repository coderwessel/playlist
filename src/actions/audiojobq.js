import store from '../store'

export const LOAD_TRACK = 'LOAD_TRACK'
export const START_PLAY = 'START_PLAY'
export const PAUSE_PLAY = 'PAUSE_PLAY'
export const RESUME_PLAY = 'RESUME_PLAY'
export const STOP_PLAY = 'STOP_PLAY'
export const SET_POSITION = 'SET_POSITION'
export const JOB_SUCCES = 'JOB_SUCCES'
export const JOB_FAIL = 'JOB_FAIL'

export function loadTrack({artist, title}) {

  return function (dispatch){
    dispatch({
      type: LOAD_TRACK,
      payload: {artist:artist, title: title}
    })
  }
}

export function startPlay(){
  return function (dispatch){
		const actiontype=(store.getState().audio.paused)?RESUME_PLAY:START_PLAY
		dispatch({
      type: actiontype
    })
  }
}

export function pausePlay(){
  return function (dispatch){
    dispatch({
      type: PAUSE_PLAY
    })
  }
}

export function resumePlay(){
  return function (dispatch){
    dispatch({
      type: RESUME_PLAY
    })
  }
}


export function stopPlay(){
  return function (dispatch){
    dispatch({
      type: STOP_PLAY
    })
  }
}

export function setPosition(msec){
  return function (dispatch){
    dispatch({
      type: SET_POSITION,
      payload: msec
    })
  }
}

export function jobSucces(){
  return function (dispatch){
    dispatch({
      type: JOB_SUCCES
    })
  }
}


export function jobFail(){
  return function (dispatch){
    dispatch({
      type: JOB_FAIL
    })
  }
}
