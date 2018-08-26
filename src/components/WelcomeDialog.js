import * as React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {connect} from 'react-redux'
import {createPlaylist,} from '../actions/playlists'
import {fetchPlaylist,} from '../actions/playlist'

// import { connect } from 'react-redux'
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';


const styles = theme => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    //marginTop: theme.spacing.unit,
    // marginLeft: 100px,
    // marginRight: 100px,
    left: '100px',
    right: '100px',
    // width: '100%',
    // maxWidth: 360,
    top: '30px',
    bottom: '30px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class WelcomeDialog extends React.PureComponent {
  state = {
      open: true,
    };

    handleClickOpen = () => {
      this.setState({ open: false });
    };

    handleClose = () => {
      this.props.createPlaylist({name: 'untitled', saved: false})
      this.setState({ open: false });

    };

    handleChange = (event) => {
      const {name, value} = event.target

      this.setState({
        [name]: value
      })
    }

    handleLoad = () => {
      this.props.fetchPlaylist(this.state.playlistNumber)
    }
  render () {
    const {  playlistId } = this.props;
    if (playlistId && playlistId !== this.props.match.params.id){
        this.props.history.push(`/${playlistId}`)
    }

    return (
           <Dialog
                     open={this.state.open}
                     onClose={this.handleClose}
                     aria-labelledby="welcome-dialog-title"
                   >
                     <DialogTitle id="welcome-dialog-title">Select Playlist</DialogTitle>
                     <DialogContent>
                       <DialogContentText>
                         This is all very much under construction.
                         Please enter a playlist number
                       </DialogContentText>
                       <TextField
                         autoFocus
                         margin="dense"
                         id="playlistNumber"
                         name="playlistNumber"
                         label="enter a playlist Id"
                         type="number"
                         value={this.state.playlistNumber || ''}
                         onChange={ this.handleChange }
                         fullWidth
                       />
                     </DialogContent>
                     <DialogActions>
                       <Button onClick={this.handleLoad} variant="contained" size="small" color="primary">
                         Open  Playlist
                       </Button>
                       <Button onClick={this.handleClose} variant="contained" size="small" color="primary">
                         Create a new Playlist
                       </Button>

                     </DialogActions>
                   </Dialog>

    )
  }
}



const mapStateToProps = function (state) {
  return {
    playlistId: state.playlist.id
  }
}


// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles)(connect (mapStateToProps, {createPlaylist, fetchPlaylist}) (WelcomeDialog));
