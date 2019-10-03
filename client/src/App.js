import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header, Footer} from './components/Layouts/index'
import Surface from './components/Layouts/Surface';

function App() {
  return (
    <div className="App">
      <Header />
      <Surface></Surface>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
