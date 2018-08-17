export const SET_REORDER_SOURCE = 'SET_REORDER_SOURCE'

export function setReorderSource(index) {
    return function (dispatch){
        dispatch({
          type: SET_REORDER_SOURCE,
          payload: index
        })
    }
}
