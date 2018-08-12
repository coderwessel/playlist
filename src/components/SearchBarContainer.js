import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme =>({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class SearchBarContainer extends React.PureComponent {
  state = {  };

  handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }

  render () {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Find Music"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
          />
          <IconButton className={classes.menuButton} color="inherit" aria-label="Search">
            <SearchIcon />
          </IconButton>
        </form>
</div>
    )
  }
}

SearchBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// TODO: How do I map the currently playing track in my state...
const mapStateToProps = (state) => {
  return {
    tracklist: state.tracklist
  }
}


// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect(mapStateToProps)(SearchBarContainer));
