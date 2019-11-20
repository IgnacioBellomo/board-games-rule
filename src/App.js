import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import BoardGameSearch from './components/BoardGameSearch';
import BoardGame from './components/BoardGame';

function App() {
  return (
    <div className="App">
        <Route render={(props)=> <NavBar {...props} />} />

        <Route exact path="/" render = {(props)=>
        <HomePage {...props} />}/>

        <Route exact path="/search/:id" render = {(props)=>
        <BoardGameSearch
          {...props}
        />}/>

        <Route exact path="/search/:name/:id" render = {(props) => 
        <BoardGame 
          {...props}
          />}/>
      
    </div>
  );
}

export default App;
