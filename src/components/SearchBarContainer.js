import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import keycode from 'keycode'
import Downshift from 'downshift'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { addTrack } from '../actions/tracklist'

const styles = theme =>({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
//from demo
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
})

const suggestions = [
  { label: 'Toto - Rosanna',
    artist: 'Toto',
    title: 'Rosanna',
    art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
    duration: 241 },
  { label: 'Cure - Forest',
  artist: 'Cure',
  title: 'Forest',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241 },
  { label: 'Prince - Kiss',
  artist: 'Prince',
  title: 'Kiss',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241 },
  { label: 'Metallica - Nothing else Matters',
  artist: 'Metallica',
  title: 'Nothing else Matters',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241 },
  { label: 'David Bowie - Let\'s Dance',
  artist: 'David Bowie',
  title: 'Let\'s Dance',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241 },
  { label: 'Calvin Harris - Colors',
  artist: 'Calvin Harris',
  title: 'Colors',
  art: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHaNIyjHbvSiCnhweKKXHy0gEu7FRwfjJIQOSelHeuVRClNveASNKDr0uECnC5BQTcMQ',
  duration: 241 }
]

// function handleMenuItemClick (track){
//   // alert(`${track.label} was clicked`)
//   // var flap = {artist,title,art,duration} = track
//   addTrack({artist: track.artist,
//     title:track.title,
//     art:track.art,
//     duration:track.duration})
// }


function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, 
    itemProps, highlightedIndex, selectedItem, handleMenuItemClick }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      onClick  =  {handleMenuItemClick.bind(this, suggestion)}
      onSelect  =  {handleMenuItemClick.bind(this, suggestion)}
    >
      {suggestion.label}
      
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  handleMenuItemClick: PropTypes.func
};

function getSuggestions(inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class SearchBarContainer extends React.PureComponent {
  state = {  };

  // TODO: how do I add the slection to the playlist??
  // handleChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value })
  //   }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Downshift>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Search Music (start typing)',
                id: 'integration-downshift-simple',
              }),
            })}
            {/* TODO: I would like a searchicon here
            <IconButton className={classes.menuButton} color="inherit" aria-label="Search">
             <SearchIcon />
           </IconButton> */}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem,
                    handleMenuItemClick: this.props.addTrack
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
    )
  }
}

SearchBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// TODO: How do I map the currently playing track in my state...
const mapStateToProps = function (state) {
  return {
    tracklist: state.tracklist
  }
}

// export default connect(null, { addAlbum })(AlbumsListContainer)
export default withStyles(styles) (connect( null, {addTrack})(SearchBarContainer));
