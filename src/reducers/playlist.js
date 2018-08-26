// src/reducers/playlist.js

import {FETCH_PLAYLIST} from '../actions/playlist'
import {UPDATE_PLAYLIST} from '../actions/playlist'

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCH_PLAYLIST:
    return action.payload

  case UPDATE_PLAYLIST:
    return action.payload
  default:
    return state
  }
}

const initialState = []
export default reducer
