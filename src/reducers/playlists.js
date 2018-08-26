// src/reducers/playlists.js

import {FETCHED_ALL_PLAYLISTS} from '../actions/playlists'
import {ADD_PLAYLIST} from '../actions/playlists'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCHED_ALL_PLAYLISTS:
    return action.payload.playlists
  case ADD_PLAYLIST:
    return [...state].push(action.payload)
  default:
    return state
  }
}

const initialState = []
export default reducer
