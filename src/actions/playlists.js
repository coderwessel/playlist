//actions/playlists.js
import {fetchPlaylist} from './playlist'
import * as request from 'superagent'
const baseUrl = process.env.REACT_APP_PLAYLIST_API_BASE_URL


export const FETCHED_ALL_PLAYLISTS = 'FETCHED_ALL_PLAYLISTS'
export const ADD_PLAYLIST = 'ADD_PLAYLIST'

export function fetchAllPlaylists() {
  return function (dispatch){
    request
      .get(`${baseUrl}/playlists/`)
      .then(response => dispatch({
        type: FETCHED_ALL_PLAYLISTS,
        payload: response.body
      }))
      .catch(err => alert(err))
  }
}

export function createPlaylist(playlist) {
  return function (dispatch){
    request
      .post(`${baseUrl}/playlists/`)
      .send({playlistdata:{playlist,tracklist:[]}})
      .then(response => {dispatch({
        type: ADD_PLAYLIST,
        payload: response.body
        })
        dispatch(fetchPlaylist(response.body.id))
      })
      .catch(err => alert(err))
  }
}
