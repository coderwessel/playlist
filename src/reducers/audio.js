import {UPDATE_SOURCE,
 PLAY_AUDIO_TRACK,
 PAUSE_AUDIO_TRACK,
 SET_AUDIO_POSITION,
 SET_AUDIO_DURATION,
END_AUDIO_TRACK} from '../actions/audio'

 const reducer = (state = initialState, action = {}) => {
   switch (action.type) {
     case UPDATE_SOURCE:
     return {
         source: action.payload,
         playing: false,
         paused: false,
         loaded: true,
         ended: false,
         position: 0,
         duration: 0
     }
     case PLAY_AUDIO_TRACK:
     return {...state, playing:true, paused: false}

     case PAUSE_AUDIO_TRACK:
     return {...state, playing:false, paused: true}

     case SET_AUDIO_POSITION:
     return {...state, postion: action.payload}

     case SET_AUDIO_DURATION:
     return {...state, duration: action.payload}

     case END_AUDIO_TRACK:
     return { ...state,
         playing: false,
         paused: false,
         ended: true
     }

     default:
     return state
  }
}

const initialState = {
    source:'',
    playing: false,
    paused: false,
    loaded: false,
    ended: false,
    position: 0,
    duration: 0
}

export default reducer
