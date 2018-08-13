export const ADD_TRACK = 'ADD_TRACK'
export const DEL_TRACK = 'DEL_TRACK'

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
