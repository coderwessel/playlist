import {
    SET_AUDIO_POSITION,
    SET_AUDIO_DURATION,
    } from '../actions/audioposition'
   
    const reducer = (state = initialState, action = {}) => {
      switch (action.type) {
   
        case SET_AUDIO_POSITION:
        return {...state, position: action.payload}
   
        case SET_AUDIO_DURATION:
        return {...state, duration: action.payload}
   
        default:
        return state
     }
   }
   
   const initialState = {
       position: 0,
       duration: 0
   }
   
   export default reducer
   