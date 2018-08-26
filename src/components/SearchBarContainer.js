import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import keycode from 'keycode'
import Downshift from 'downshift'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { addTrack } from '../actions/tracklist'
import { fetchSearchTracks} from '../actions/searchresults'

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
    height: 150,
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
  const label = selectedItem ? selectedItem.label : '' //had to change this to account for label
  const isSelected = label.indexOf(suggestion.label) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}

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
};

//ha to account for mulitple matches like "da bo" => DAvid BOwie
//TODO: Rephrase ... ;)
function zitErIn(die, indie){
  const uitslag = (indie.toLowerCase().indexOf(die.toLowerCase()) !== -1)
  // console.log(`Zit ${die} in ${indie} ?  ${uitslag}`)
  return uitslag

}

//TODO: Rephrase ... ;)
function zitErAllemaalIn(diedingen, indie){
  const uitslag = diedingen.findIndex((datding) => !zitErIn(datding,indie)) === -1
  // console.log(`Zitten al ${diedingen} in ${indie} ?  ${uitslag}`)
  return uitslag
}

function getSuggestions(inputValue, suggestions, updateStore) {
  let count = 0
  // do something with redux store (get suggestions from lastfm api or cache)
 updateStore(inputValue)

  //this for getting mulitpple matches
  const inputLiterals = inputValue.split(' ')

  return suggestions.filter(suggestion => {
    const keep =
      // (!inputValue || inputLiterals.filter(
      //   (lit) => suggestion.label.toLowerCase().indexOf(lit.toLowerCase()) === -1) === -1 ) &&
      // count < 5
      //
      // (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      // count < 5

      // (!inputValue || zitErIn(inputValue, suggestion.label)) && count < 5
      (!inputValue || zitErAllemaalIn(inputLiterals, suggestion.label)) && count < 5

    if (keep) {
      count += 1
    }

    return keep
  })
}

class SearchBarContainer extends React.PureComponent {
  // state = {  };

  render () {
    console.log("rendering searchbar...")
    const { classes } = this.props
    const { searchresults} = this.props
    return (
      <div className={classes.root}>
      {/* on select add track (redux)
       make sure to show item.label as for selected item */}
      <Downshift onSelect={track => {this.props.addTrack(track)}} itemToString={item=>(item!==null)?item.label:''}>
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
                {getSuggestions(inputValue, searchresults, this.props.fetchSearchTracks).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    //item: suggestion (instead of suggestion.label) this is so we can pas whole item to addtrack on select
                    itemProps: getItemProps({ item: suggestion}),
                    highlightedIndex,
                    selectedItem,
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

// we need searchresults for the suggestion list.
const mapStateToProps = function (state) {
  return {
    searchresults: state.searchresults.tracks
  }
}

export default withStyles(styles) (connect( mapStateToProps, {addTrack, fetchSearchTracks})(SearchBarContainer));
