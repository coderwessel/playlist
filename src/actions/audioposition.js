export const SET_AUDIO_POSITION = 'SET_AUDIO_POSITION'
export const SET_AUDIO_DURATION = 'SET_AUDIO_DURATION'


export function setAudioPosition(pos){
    return function (dispatch){
      dispatch({
        type: SET_AUDIO_POSITION,
        payload: pos
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
