export const ADD_TRACK = 'ADD_TRACK'
export const DEL_TRACK = 'DEL_TRACK'
export const ACTIVATE_TRACK = 'ACTIVATE_TRACK'
export const ACTIVATE_NEXT_TRACK = 'ACTIVATE_NEXT_TRACK'
export const ACTIVATE_PREVIOUS_TRACK = 'ACTIVATE_PREVIOUS_TRACK'
export const MOVE_TRACK = 'MOVE_TRACK'
export const SET_TRACKLIST = 'SET_TRACKLIST'

export function setTrackList(tracklist) {
  return function (dispatch){
      dispatch({
        type: SET_TRACKLIST,
        payload: tracklist
      })
  }
}

export function addTrack(track) {
    // return {
    //       type: ADD_TRACK,
    //       track
    // }
    return function (dispatch){
        dispatch({
          type: ADD_TRACK,
          payload: track
        })
    }
}

export function delTrack(trackindex) {
    // return {
    //       type: ADD_TRACK,
    //       track
    // }
    return function (dispatch){
        dispatch({
          type: DEL_TRACK,
          payload: trackindex
        })
    }
}

export function activateTrack(trackindex) {
    return function (dispatch){
        dispatch({
          type: ACTIVATE_TRACK,
          payload: trackindex
        })
    }
}

export function activateNextTrack() {
    console.log('activateNExtTrack action was called')
    return function (dispatch){
        dispatch({
          type: ACTIVATE_NEXT_TRACK
        })
    }
}

export function activatePreviousTrack() {
    return function (dispatch){
        dispatch({
          type: ACTIVATE_PREVIOUS_TRACK
        })
    }
}

export function moveTrack(from, to) {
    return function (dispatch){
        dispatch({
          type: MOVE_TRACK,
          payload: {from:from, to:to}
        })
    }
}
