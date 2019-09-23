import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header, Footer} from './components/Layouts/index'
import ResultGrid from './components/Results/ResultGrid';
import UserGrid from './components/Results/UserGrid'

function App() {
  return (
    <div className="App">
      <Header/>
      <UserGrid></UserGrid>
      {/* <ResultGrid></ResultGrid> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
