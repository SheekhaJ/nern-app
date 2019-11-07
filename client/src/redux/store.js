import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
const reduxThunk = require('redux-thunk').default

export default function configureStore(preloadedState) {
    return createStore(rootReducer, applyMiddleware(reduxThunk, createLogger()));
}