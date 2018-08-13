// import { createStore } from 'redux'
// import reducer from './reducers/index'


// const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()






// const store = createStore(reducer, enhancer)

// export default store


// src/store.js
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const reducer = combineReducers(reducers)
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
const enhancer = compose(
	applyMiddleware(ReduxThunk),
	devTools
)

const store = createStore(reducer, enhancer)

export default store