import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import StatusBarContainer from './StatusBarContainer.js'
import SearchBarContainer from './SearchBarContainer.js'
import TrackListContainer from './TrackListContainer.js'
import TrackControlsContainer from './TrackControlsContainer.js'
import AudioContainer from './AudioContainer.js'
import {fetchPlaylist} from '../actions/playlist'

class PlaylistContainer extends PureComponent {
  componentDidMount() {
       this.props.fetchPlaylist(this.props.match.params.id)
       // console.log(`should I set history to ${playlist.id}?`)
       // if (playlist.id && playlist.id !== this.props.match.params.id){
       //     this.props.history.push(`/${playlist.id}`)
       //     console.log(`set history to ${playlist.id}`)
       // }

   }


  render () {
    // const {playlist} = this.props

    return (
                <div>
                    <StatusBarContainer/>
                    <AudioContainer/>
                    <SearchBarContainer/>
                    <TrackListContainer/>
                    <TrackControlsContainer/>
          </div>
        )
      }
}


// redux
const mapStateToProps = function (state) {
  return {
    playlist: state.playlist
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default connect(mapStateToProps,{fetchPlaylist}) (PlaylistContainer)
