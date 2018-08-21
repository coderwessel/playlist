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
  state = {
    completed: 0,
  }

  // componentDidMount() {
  //   this.timer = setInterval(this.progress, 500);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }
  //
  // timer = null;

//   progress = () => {
//     const {duration, position} = this.props
//     const { completed } = (duration >0)?position/duration:0;
//   //   if (completed === 100) {
//   //     this.setState({ completed: 0 });
//   //   } else {
//   //     const diff = Math.random() * 10;
//   //     this.setState({ completed: Math.min(completed + diff, 100) });
//   //   }
//   // };
// }
  handleClick(e) {
    const {audio} = this.props
    //en...
    this.props.setPosition((e.pageX/window.innerWidth)*audio.duration)
    alert(`${e.pageX}, ${window.innerWidth}, ${Math.floor((e.pageX/window.innerWidth)*100)}`)
    // alert (`perc: , pageX: ${e.pageX}, pageY: ${e.pageY}, total width:..., relative position:${this.refs.barRef.offsetLeft}, divwidth: ${this.refs.barRef.offsetWidth}`)
  }

  render() {
    const { classes } = this.props;
    const {audio} = this.props
    const completed = (audio.duration>0)?((audio.position/audio.duration)*100):0;
    console.log(completed)
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" ref="barRef" value={completed}
         onClick={(e) => this.props.setPosition((e.pageX/window.innerWidth)*audio.duration)}/>
      </div>
    );
  }
}

TrackProgressBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
  return {
    audio: state.audio
  }
}

export default withStyles(styles)(connect(mapStateToProps,{setPosition})((TrackProgressBarContainer)))
