import * as request from 'superagent'
import store from '../store'
export const  FETCH_SEARCH_TRACKS = 'FETCH_SEARCH_TRACKS'
export const  START_SEARCH = 'START_SEARCH'
export const  END_SEARCH = 'END_SEARCH'
export const  UPDATE_SEARCH_CACHE = 'UPDATE_SEARCH_CACHE'

function lastfm2playlist (item){
            return {
            label: `${item.artist} - ${item.name}`,
            artist: item.artist,
            title: item.name,
            art: item.image[1]['#text'],
            duration: 241 }
          }

export function fetchSearchTracks(querytext) {
  if (querytext==='') return function (dispatch){return}
  else
  return function (dispatch){
  //first check if result in cache
  const cacheIndex = store.getState().searchresults.cached.findIndex((cache)=>{
        return (cache.query===querytext)
    })
  //if cached result available, update with cached result
  if (cacheIndex >= 0 ) {
    console.log(`cache match: ${querytext}: ${cacheIndex} ,`)
    const tracks = store.getState().searchresults.cached[cacheIndex].tracks
    return {
            type: FETCH_SEARCH_TRACKS,
            payload: tracks.map(lastfm2playlist)
        }
  }
  //if no cached result available start search on last fm
  else if (store.getState().searchresults.searching) {return}
  else {
    dispatch({ type: START_SEARCH })
    request
      .get(process.env.REACT_APP_LASTFM_API_HOST)
      .query({method:'track.search'})
      .query({track:querytext})
      .query({api_key:process.env.REACT_APP_LASTFM_API_SECRET})
      .query({format:'json'})
      .query({limit:process.env.REACT_APP_LASTFM_API_TRACK_SEARCH_LIMIT})
      .then(response => {
         if(response.body.results!==undefined){
            //TODO: Why do it like this??
             const newcached = [...store.getState().searchresults.cached,
                                  {query: querytext,
                                    tracks: response.body.results.trackmatches.track
                                  }]
             dispatch({
                      type: UPDATE_SEARCH_CACHE,
                      payload: newcached
               })
             dispatch({
                      type: FETCH_SEARCH_TRACKS,
                      payload: response.body.results.trackmatches.track.map(lastfm2playlist)
                    })
        }
         dispatch({
                  type: END_SEARCH
                })
        }
      )
      .catch(err => { alert(err)
                dispatch({
                    type: END_SEARCH
                    })
          })
    }
  }
}
