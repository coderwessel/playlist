import {SET_REORDER_SOURCE} from '../actions/reorder'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REORDER_SOURCE:
    return {index: action.payload}
    
    default:
    return state
  }
}  

const initialState = 
  {
    index: -1
  }

  export default reducer
