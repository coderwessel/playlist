import {UPDATE_SOURCE,
 PLAY_AUDIO_TRACK,
 PAUSE_AUDIO_TRACK,
 RESUME_AUDIO_TRACK,
END_AUDIO_TRACK} from '../actions/audio'

 const reducer = (state = initialState, action = {}) => {
   switch (action.type) {
     case UPDATE_SOURCE:
     return {
         ...action.payload,
         playing: false,
         paused: false,
         resume: false,
         loaded: true,
         ended: false,
       }
     case PLAY_AUDIO_TRACK:
     return {...state, playing:true, paused: false, resume: false, ended:false}

     case RESUME_AUDIO_TRACK:
     return {...state, playing: false, paused: false, resume: true, ended:false}

     case PAUSE_AUDIO_TRACK:
     return {...state, playing:false, paused: true, resume: false, ended:false}

    //  case SET_AUDIO_POSITION:
    //  return {...state, position: action.payload}

    //  case SET_AUDIO_DURATION:
    //  return {...state, duration: action.payload}

     case END_AUDIO_TRACK:
     return { ...state,
         playing: false,
         paused: false,
         resume: false,
         ended: true
     }

     default:
     return state
  }
}

const initialState = {
    source:'',
    artist: '',
    title: '',
    playing: false,
    paused: false,
    resume: false,
    loaded: false,
    ended: false,
    position: 0,
    duration: 0
}

export default reducer
