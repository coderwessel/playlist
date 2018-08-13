import React, { Component } from 'react';
import './App.css';
import store from './store'
import {Provider} from 'react-redux'
import 'typeface-roboto'
import StatusBarContainer from './components/StatusBarContainer.js'
import SearchBarContainer from './components/SearchBarContainer.js'
import TrackListContainer from './components/TrackListContainer.js'
import TrackControlsContainer from './components/TrackControlsContainer.js'
const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    return (
         <Provider store={store}>
              <div className="App">
              
                <StatusBarContainer/>
                <SearchBarContainer/>
                <TrackListContainer/>
                <TrackControlsContainer/>
              </div>
        </Provider>
    );
  }
}

export default App;
