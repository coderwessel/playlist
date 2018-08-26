//actions/playlists.js
import * as request from 'superagent'
import {setTrackList} from './tracklist'

const baseUrl = process.env.REACT_APP_PLAYLIST_API_BASE_URL

export const FETCH_PLAYLIST = 'FETCH_PLAYLIST'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'

export function fetchPlaylist(playlistId) {
  return function (dispatch){
    request
      .get (`${baseUrl}/playlists/${playlistId}`)
      .then (response => {
        dispatch({
          type: FETCH_PLAYLIST,
          payload: {id:response.body.playlist.id, playlist:response.body.playlist.playlistdata.playlist}
        })
        dispatch(setTrackList(response.body.playlist.playlistdata.tracklist))
      })
      .catch (err => alert(err))
  }
}

export function updatePlaylist(playlist, tracklist) {
  return function (dispatch){
    const updatedplaylist =
        {
         playlistdata:
          { playlist: playlist.playlist,
           tracklist: tracklist}
         }
    request
      .put(`${baseUrl}/playlists/${playlist.id}`)
      .send(updatedplaylist)
      .then(response => {
        dispatch({
          type: UPDATE_PLAYLIST,
          payload: {id:response.body.playlist.id, playlist:response.body.playlist.playlistdata.playlist}
          })
          dispatch(setTrackList(response.body.playlist.playlistdata.tracklist))
        })
      .catch(err => alert(err))
  }
}
