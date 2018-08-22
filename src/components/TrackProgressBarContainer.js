import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {setPosition} from '../actions/audiojobq'
const styles = {
  root: {
    flexGrow: 1,
  },
};

class TrackProgressBarContainer extends React.Component {

  render() {
    const { classes } = this.props;
    const {audioposition} = this.props
    const completed = (audioposition.duration>0)?
                         ((audioposition.position/audioposition.duration)*100):0;
    console.log(completed)
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate"  value={completed}
            onClick={(e) => 
               this.props.setPosition((e.pageX/window.innerWidth)*audioposition.duration)}/>
      </div>
    );
  }
}

TrackProgressBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
  return {
    audioposition: state.audioposition
  }
}

export default withStyles(styles)(connect(mapStateToProps,{setPosition})((TrackProgressBarContainer)))
