import React, { Component } from 'react';
import './App.css';
import store from './store'
import {Provider} from 'react-redux'
import 'typeface-roboto'
// import StatusBarContainer from './components/StatusBarContainer.js'
// import SearchBarContainer from './components/SearchBarContainer.js'
// import TrackListContainer from './components/TrackListContainer.js'
// import TrackControlsContainer from './components/TrackControlsContainer.js'
// import AudioContainer from './components/AudioContainer.js'
import PlaylistContainer from './components/PlaylistContainer'
import WelcomeDialog from './components/WelcomeDialog.js'
import { BrowserRouter as Router, Route, } from 'react-router-dom'

//TODO: maybe create child component later but now just do it lake This
// import {connect} from 'react-redux'
// import {fetchPlaylist} from './actions/playlist'

// import
// const styles = {
//   root: {
//     flexGrow: 1,
//   },
// };

class App extends Component {


  render() {
    return (
         <Provider store={store}>
            <Router>
                <div className="App">
                  <Route exact path="/:id" component={PlaylistContainer} />
                  <Route exact path="/" component={WelcomeDialog} />
                </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
