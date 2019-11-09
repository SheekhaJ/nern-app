import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Container from "@material-ui/core/Container";
import MainSurface from './components/Layouts/MainSurface';

const store = configureStore()

function App() {
  console.log('store is ' , store.getState())
  return (
    <Provider store={store}>
      <Container maxWidth='xl'>
        <div className="App">
          <MainSurface />
        </div>
      </Container>
    </Provider>
  );
}

export default App;
