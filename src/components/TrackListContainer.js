import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
import TrackListItem from './TrackListItem.js'
import {addTrack, delTrack, activateTrack, moveTrack, activateNextTrack} from '../actions/tracklist'
import {setReorderSource} from '../actions/reorder'
import {loadTrack, startPlay} from '../actions/audiojobq'
const styles = theme => ({
  container: {
    position: 'fixed',
    width: '100%',
    // maxWidth: 360,
    top: '100px',
    bottom: '50px',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  inner: {
    minHeight: '100%',
  },

});

class TrackListContainer extends PureComponent {
  // TODO: Add drag and drop support, see https://codepen.io/adamaoc/pen/GoKZKE
  state = {
    reordering: false,
    reorderSource: -1,
    // reorderTarget: null // niet nodig
  };

  Reorder(index) {
    // if reordering and index is reorderSource => stop reordeering
    //       (roerder source is null & reordering is false)
    if (this.state.reordering && index === this.state.reorderSource){
      this.setState({reorderSource: -1, reordering: false})
      this.props.setReorderSource(-1)

    }

    // if !reordering => start reorder and set index as source
    else if (!this.state.reordering){
      this.setState({reorderSource: index, reordering: true})
      this.props.setReorderSource(index)
    }

    // if reordering and index !=spource => move track in redux store to target
    //  and stop reordering
    else if (this.state.reordering && index !== this.state.reorderSource){
      this.setState({reorderSource: -1, reordering: false})
      this.props.setReorderSource(-1)
      this.props.moveTrack(this.state.reorderSource, index)
    }
  }

  render () {
    const { classes } = this.props
    const {tracklist} = this.props
    const {audio} = this.props
    const activeTrackIndex = tracklist.findIndex(track => track.active)
    if (activeTrackIndex !== -1) {
      const activeTitle = tracklist[activeTrackIndex].title
      const activeArtist = tracklist[activeTrackIndex].artist
      if (audio.artist !== activeArtist || audio.title !== activeTitle) {
       this.props.loadTrack({artist: activeArtist, title: activeTitle})
       this.props.startPlay()
       // this.props.startPlay()
    }}

    return (
      <div className={classes.container}>
        <List className={classes.inner}>
          {tracklist.map((i,index) =>
             <TrackListItem
                            key={index}
                            index={index}
                            artist={i.artist}
                            title={i.title}
                            art={i.art}
                            active={i.active}
                            deleteaction={this.props.delTrack.bind(this,index)}
                            activateaction={this.props.activateTrack.bind(this,index)}
                            reorderaction={this.Reorder.bind(this,index)}
                            isReorderSource={(this.state.reorderSource!==index)?false:true}
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
    tracklist: state.tracklist,
    reorder: state.reorder,
    audio: state.audio
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps,
  {setReorderSource, addTrack, delTrack, activateTrack, activateNextTrack, moveTrack, loadTrack, startPlay}
)(TrackListContainer))
