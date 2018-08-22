import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ReorderIcon from '@material-ui/icons/Reorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  container: {
    width: '100%',
    // maxWidth: 360,
    minHeight: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    objectFit: 'cover',
    height: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

class TrackListItem extends React.PureComponent {

  state = {
    anchorEl: null,
    // isReorderSource: false
  };

  help =() => {alert("help")}

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = () => {
    this.props.deleteaction()
    this.setState({ anchorEl: null });
  };

  handlePlayNow = () => {
    this.props.activateaction()
    this.setState({ anchorEl: null });
  };

  handleReorder = () => {
      // this.setState({isReorderSource:true})
      this.props.reorderaction()
      // if (!this.state.isReorderSource) this.setState({isReorderSource:true})

  };

  // componentWillReceiveProps ()  {
  //   if(!this.props.isReorderSource)this.setState({isReorderSource:false})
  //   else this.setState({isReorderSource:true})
  // }

  render () {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    // const { reorder } = this.state;
    const {reorder} = this.props;

    return (<ListItem
            key={this.props.index}
   >
      <IconButton onClick={this.handleReorder}
            className={classes.menuButton} color={(Number(reorder.index)===this.props.index)?"secondary":"inherit"} aria-label="Reorder">
        <ReorderIcon/>
      </IconButton>
      <Avatar src={this.props.art} className={classes.avatar}>
          {(this.props.active)?<MusicNoteIcon/>:''}
      </Avatar>
      <ListItemText onClick={this.props.activateaction} primary={this.props.artist} secondary={this.props.title} />
      <IconButton className={classes.menuButton} color="inherit" aria-label="MoreVert" onClick={this.handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {/* {[ TODO: send this action array through props with proptypes */}
          {[ {text: "Delete", action: this.handleDelete},
             {text: "Play Now", action: this.handlePlayNow},
             {text: "Play Next", action: this.handleClose},
             {text: "Move to Last", action: this.handleClose}
           ].map((item, index) =>
          (<MenuItem key={index} onClick={item.action}>{item.text}</MenuItem>)
        )}
        </Menu>
      </ListItem>
    )
  }
}

TrackListItem.propTypes = {
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  deleteaction: PropTypes.func.isRequired,
  activateaction: PropTypes.func.isRequired,
  reorderaction: PropTypes.func.isRequired,
  isReorderSource: PropTypes.bool.isRequired
};



const mapStateToProps = function (state) {
  return {
    reorder: state.reorder
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps)(TrackListItem))

// export default connect(null, { addAlbum })(AlbumsListContainer)
// export default withStyles(styles) (TrackListItem);
