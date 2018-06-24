import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ReorderIcon from '@material-ui/icons/Reorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';


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
  render () {
    const { classes } = this.props;
    return (<ListItem>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Reorder">
        <ReorderIcon />
      </IconButton>
      <Avatar src={this.props.art} className={classes.avatar}>
          {(this.props.active)?<MusicNoteIcon/>:''}
      </Avatar>
          <ListItemText primary={this.props.artist} secondary={this.props.title} />
      <IconButton className={classes.menuButton} color="inherit" aria-label="MoreVert">
        <MoreVertIcon />
      </IconButton>
      </ListItem>
    )
  }
}

TrackListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (TrackListItem);
