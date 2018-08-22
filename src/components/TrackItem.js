import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';


const styles = theme => ({
  avatar: {
    objectFit: 'cover',
    height: '100%',
  },
});

class TrackItem extends React.PureComponent {
  render () {
    const { classes } = this.props;
    return (
      <ListItem>
      <Avatar src={this.props.art} className={classes.avatar}/>
      <ListItemText primary={`${this.props.artist} - ${this.props.title}`} />
      </ListItem>
    )
  }
}

TrackItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
};

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (TrackItem);
