import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
const reduxThunk = require('redux-thunk').default

// const store = createStore(userResultReducer, applyMiddleware(reduxThunk))
// store.subscribe(() => {
//     console.log('store: '+ store.getState());
// });
// console.log('inside store!'+store);
// store.dispatch(fetchUsers());

export default function configureStore(preloadedState) {
    return createStore(rootReducer, applyMiddleware(reduxThunk));
}