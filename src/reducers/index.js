// import { combineReducers } from 'redux'
import tracklist from './tracklist'
import reorder from './reorder'
import searchresults from './searchresults'
import audio from './audio'
import audioposition from './audioposition'
import audiojobq from './audiojobq'
import playlists from './playlists.js'
import playlist from './playlist'


export default {
    tracklist: tracklist,
    reorder: reorder,
    searchresults: searchresults,
    audio: audio,
    audiojobq: audiojobq,
    audioposition: audioposition,
    playlists: playlists,
    playlist: playlist,
  };
