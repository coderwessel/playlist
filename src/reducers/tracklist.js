import {ACTIVATE_TRACK,
  ACTIVATE_NEXT_TRACK,
  ACTIVATE_PREVIOUS_TRACK,
  ADD_TRACK,
  DEL_TRACK,
  MOVE_TRACK} from '../actions/tracklist'

const reducer = (state = initialState, action = {}) => {
  const currentTrack = state.findIndex ((index) => index.active) //find current active track index

  switch (action.type) {
    case ADD_TRACK:
    return [...state,action.payload]

    case DEL_TRACK:
    return [...state].filter( (item,index) => index != action.payload)

    case ACTIVATE_TRACK:
    return state.map( (item,index) => {
      let itemcopy = item
      if (index === action.payload) itemcopy.active=true
        else if(itemcopy.active === true) itemcopy.active=false
      return itemcopy
    })

    case ACTIVATE_NEXT_TRACK:
      if (state.length === 0) return state // no tracks => do nothing
      switch (currentTrack){
      case -1: // no current track => make first track active
        const newState = [...state]
        newState[0].active=true
        return newState

      case state.length-1: // current == last track => do nothing
        return state

      default: // deactivate current track and activate next track
        const nextTrack = currentTrack+1
        return state.map( (item,index) => {
          let itemcopy = item
          if (index === currentTrack) itemcopy.active = false
          else if (index === nextTrack) itemcopy.active = true
          return itemcopy
        })
      }

    case ACTIVATE_PREVIOUS_TRACK:
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
        action.payload.from != action.payload.to){
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

const initialState =
[
  {
  active: false,
  artist: 'Duran Duran',
  title: 'rio',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241
  },
  {
  active: true,
  artist: 'Andre Hazes',
  title: 'De Vlieger',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 205
  }
]

// probeer eens wat....
// const initialState = [{
//   id: 3,
//   title: 'wessel'
// }]

export default reducer
