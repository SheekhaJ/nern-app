import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import MainSurface from './components/Layouts/MainSurface';

const store = configureStore()

function App() {
  console.log('store is ' , store.getState())
  return (
    <Provider store={store}>
    <div className="App">
      <MainSurface/>
    </div>
    </Provider>
  );
}

export default App;
