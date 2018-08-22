import {  FETCH_SEARCH_TRACKS, START_SEARCH, END_SEARCH, UPDATE_SEARCH_CACHE} from '../actions/searchresults'
const SEARCH_CACHE_MAX_SIZE = 30

const reducer = (state = initialState, action = {}) => {
  let newcached = []      

  switch (action.type) {
    case START_SEARCH:
    return {...state,
            searching: true}

    case END_SEARCH:
    return {...state,
            searching: false}

    case UPDATE_SEARCH_CACHE:
    newcached = [...state.cached, action.payload]
    if (newcached.length > SEARCH_CACHE_MAX_SIZE) newcached.shift()
    return {...state,
            cached: newcached}

    case FETCH_SEARCH_TRACKS:
    return {...state,
            tracks: action.payload}

    default:
    return state
  }
}

const initialState =
{ tracks: [
    { label: 'hoewabfefsd',
    artist: 'DavsdfasdfffffffffffffffffffffffffffffffffffBowe',
    title: 'sdfsadrepioptr',
    art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
    duration: 241 },
    { label: 'dsfasfd sadf',
    artist: 'sdf',
    title: 'sdfs',
    art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
    duration: 241 }
  ],
  cached: [],
  searching: false
}

export default reducer
