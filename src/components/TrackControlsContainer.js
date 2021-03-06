import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import TrackProgressBarContainer from './TrackProgressBarContainer.js'
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause'
import {activateNextTrack, activatePreviousTrack} from '../actions/tracklist'
import {playAudioTrack, pauseAudioTrack} from '../actions/audio'
import {pausePlay, startPlay} from '../actions/audiojobq'
const styles = theme =>({
  container: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class TrackControlsContainer extends React.PureComponent {
  state = {  };

  render () {
    const { classes } = this.props;
    const {audio} = this.props
    return (
      <div className={classes.container}>
          <TrackProgressBarContainer/>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Search"
          onClick ={this.props.activatePreviousTrack}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton className={classes.menuButton} onClick ={(!audio.playing)?this.props.startPlay:this.props.pausePlay} color="inherit" aria-label="Search">
            {(!audio.playing)?<PlayArrowIcon />:<PauseIcon/>}
          </IconButton>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Search"
          onClick ={this.props.activateNextTrack}>
            <SkipNextIcon />
          </IconButton>
      </div>
    )
  }
}

TrackControlsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// TODO: How do I map the currently playing track in my state...
const mapStateToProps = (state) => {
  return {
    tracklist: state.tracklist,
    audio: state.audio
  }
}


// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps, {pausePlay, startPlay, playAudioTrack, pauseAudioTrack, activateNextTrack, activatePreviousTrack})(TrackControlsContainer));
