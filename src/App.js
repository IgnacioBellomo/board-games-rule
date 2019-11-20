import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import TestAPIResults from './testAPIResults';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import BoardGameSearch from './components/BoardGameSearch';
import BoardGame from './components/BoardGame';

function App() {

  let boardGameClientID = 'snrWFZ0nvl';

  console.log('test');
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/" render = {()=>
        <HomePage/>}/>

        <Route exact path="/search/:id" render = {(props)=>
        <BoardGameSearch
          {...props}
        />}/>

        <Route exact path="/:id" render = {(props) => 
        <BoardGame 
          {...props}
          />}/>

      </Switch>
      
    </div>
  );
}

export default App;
