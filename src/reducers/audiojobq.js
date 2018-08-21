import {
  LOAD_TRACK,
  START_PLAY,
  PAUSE_PLAY,
  RESUME_PLAY,
  STOP_PLAY,
  SET_POSITION,
  JOB_SUCCES,
  JOB_FAIL
} from '../actions/audiojobq'

const reducer = (state = initialState, action = {}) => {
   let newjobs = []
   switch (action.type) {
     case LOAD_TRACK:
     newjobs = [...state.jobs, {job: LOAD_TRACK, payload: action.payload}]
     return {
         ...state, jobs: newjobs
     }

     case START_PLAY:
     newjobs = [...state.jobs, {job: START_PLAY}]
     return {
         ...state, jobs: newjobs
     }

     case PAUSE_PLAY:
     newjobs = [...state.jobs, {job: PAUSE_PLAY}]
     return {
         ...state, jobs: newjobs
     }

     case RESUME_PLAY:
     newjobs = [...state.jobs, {job: RESUME_PLAY}]
     return {
         ...state, jobs: newjobs
     }

     case SET_POSITION:
     newjobs = [...state.jobs, {job: SET_POSITION, payload: action.payload}]
     return {
         ...state, jobs: newjobs
     }

     case JOB_SUCCES:
     newjobs = [...state.jobs]
     newjobs.shift()
     return {
         ...state, jobs: newjobs
     }

     default:
     return state
  }
}

const initialState = {
    jobs: [],
    success: true,
    fail: false,
}

export default reducer
