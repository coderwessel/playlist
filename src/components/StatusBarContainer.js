import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar';
// import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
import TrackItem from './TrackItem';

const styles = {
  root: {
    // flexGrow: 1,
    width:'100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class StatusBarContainer extends React.PureComponent {
  activeTrack() {
    const a_track = this.props.tracklist.find((i)=>i.active)
    if (a_track!=null) return a_track
    else return {artist: '-', title: 'no track selected', art: ''}
  }
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <div>
        <Toolbar>
          <TrackItem artist={this.activeTrack().artist}
              title={this.activeTrack().title}
                  art={this.activeTrack().art}/>
          </Toolbar>
          </div>
      </div>
    )
  }
}

StatusBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// TODO: How do I map the currently playing track in my state...
const mapStateToProps = (state) => {
  return {
    tracklist: state.tracklist
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps)(StatusBarContainer));
