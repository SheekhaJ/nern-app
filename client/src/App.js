import React from 'react';
import './App.css';
import {Header} from './components/Layouts/index'
import Surface from './components/Layouts/Surface';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore()

function App() {
  console.log('store is ' , store.getState())
  // debugger;
  return (
    <Provider store={store}>
    <div className="App">
      <Header />
      <Surface/>
      {/* <Footer/> */}
    </div>
    </Provider>
  );
}

export default App;
