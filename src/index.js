// import React from 'react';
// import ReactDOM from 'react-dom';
// // import { BrowserRouter } from 'react-router-dom'
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';


// ReactDOM.render(
//   <App />,
// document.getElementById('root'));

// registerServiceWorker();


//src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);