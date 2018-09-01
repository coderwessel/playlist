import {ACTIVATE_TRACK,
  ACTIVATE_NEXT_TRACK,
  ACTIVATE_PREVIOUS_TRACK,
  ADD_TRACK,
  DEL_TRACK,
  MOVE_TRACK,
  SET_TRACKLIST} from '../actions/tracklist'

const reducer = (state = initialState, action = {}) => {
  let currentTrack = -1
  let newstate = []

  switch (action.type) {
    case SET_TRACKLIST:
    console.log(action.payload)
    return action.payload

    case ADD_TRACK:
    return [...state,action.payload]

    case DEL_TRACK:
    return [...state].filter( (item,index) => index !== action.payload)

    case ACTIVATE_TRACK:
    return state.map( (item,index) => {
      let itemcopy = item
      if (index === action.payload) itemcopy.active=true
        else if(itemcopy.active === true) itemcopy.active=false
      return itemcopy
    })

    case ACTIVATE_NEXT_TRACK:
    //what to do {
    //determine which track is active.
    currentTrack = state.findIndex ((index) => index.active) //find current active track index
    console.log(`current active is ${currentTrack}`)
    //1. current active is last in list: do nothing
    if (currentTrack === state.length-1) return state
    //2. there is no active: make first item activeTrack
    if (currentTrack === -1) {
      newstate = [...state]
      newstate[0].active =true
      return newstate }
    //3. list is empty: do nothing
    if (state.length === 0) return state
    //4. there is an active track which is not the last: make next rack active
    if (currentTrack >=0 && currentTrack < state.length -1) {
       newstate = [...state]
       newstate[currentTrack].active = false
       newstate[currentTrack+1].active = true
       return newstate
    }
    else alert('error executing next track active')
    //5. anything else: throw error

    break

    case ACTIVATE_PREVIOUS_TRACK:
    currentTrack = state.findIndex ((index) => index.active) //find current active track index
    if (state.length === 0) return state // no tracks => do nothing
      switch (currentTrack){
      case -1: // no current track => make last track active
        const newState = [...state]
        newState[state.length-1].active=true
        return newState

      case 0: // current == first track => do nothing
        return state

      default: // deactivate current track and activate previous track
        const previousTrack = currentTrack-1
        return state.map( (item,index) => {
          let itemcopy = item
          if (index === currentTrack) itemcopy.active = false
          else if (index === previousTrack) itemcopy.active = true
          return itemcopy
        })
      }

    case MOVE_TRACK:
      if (action.payload.from >= 0 && action.payload.from < state.length &&
        action.payload.to >= 0 && action.payload.to < state.length &&
        action.payload.from !== action.payload.to){
          const source = state[action.payload.from]
          const newstate = [...state]
          newstate.splice(action.payload.from,1)
          newstate.splice(action.payload.to,0,source)
          return newstate
        }
      else return state

    default:
    return state
  }
}

const initialState = []
/*
[
  {
  active: false,
  artist: 'Duran Duran',
  title: 'rio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241
  },
  {
  active: false,
  artist: 'Andre Hazes',
  title: 'De Vlieger',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  },
  {
  active: false,
  artist: 'David Bowie',
  title: 'Heroes',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241
  },
  {
  active: false,
  artist: 'Beatles',
  title: 'Hello',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  }

]

*/
// probeer eens wat....
// const initialState = [{
//   id: 3,
//   title: 'wessel'
// }]

export default reducer
