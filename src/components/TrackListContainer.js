import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TrackListItem from './TrackListItem.js'
import {addTrack, delTrack} from '../actions/tracklist'

const styles = theme => ({
  container: {
    position: 'fixed',
    width: '100%',
    // maxWidth: 360,
    top: '150px',
    bottom: '50px',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  inner: {
    minHeight: '100%',
  },

});

class TrackListContainer extends PureComponent {
  
  render () {
    const { classes } = this.props;
    const {tracklist} = this.props
    return (
      <div className={classes.container}>
        
        <List className={classes.inner}>
          {tracklist.map((i,index) => 
             <TrackListItem artist={i.artist} 
                            title={i.title} 
                            art={i.art} 
                            active={i.active} 
                            deleteaction={this.props.delTrack.bind(this,index)}
              />)}
        </List>
      </div>
    )
  }
}

TrackListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

// TODO: How do I map the currently playing track in my state...
// const mapStateToProps = (state) => {
//   //console.log(state)
//   return {
//     tracklist: state.tracklist
//   }
// }



//redux
const mapStateToProps = function (state) {
  return {
    tracklist: state.tracklist
// games: state.games
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps, 
  {addTrack, delTrack}
)(TrackListContainer))


//redux and material.ui cobined export
// export default withStyles(styles)(connect(mapStateToProps,
//     {  fetchAllGames }
// )(GamesContainer))
