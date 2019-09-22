import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header, Footer} from './components/Layouts/index'
import ResultGrid from './components/Results/ResultGrid';

function App() {
  return (
    <div className="App">
      <Header/>
      <ResultGrid></ResultGrid>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
