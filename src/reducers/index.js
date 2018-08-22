// import { combineReducers } from 'redux'
import tracklist from './tracklist'
import reorder from './reorder'
import searchresults from './searchresults'
import audio from './audio'
import audioposition from './audioposition'
import audiojobq from './audiojobq'


export default {
    tracklist: tracklist,
    reorder: reorder,
    searchresults: searchresults,
    audio: audio,
    audiojobq: audiojobq,
    audioposition: audioposition
  };
