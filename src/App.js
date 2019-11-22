import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {Switch, Route} from 'react-router-dom';
import BoardGameSearch from './components/BoardGameSearch';
import BoardGame from './components/BoardGame';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import axios from 'axios';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import qs from 'querystring';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        searchBarText: "",
        searchBarResults: null,
        atlasAccountToken: null,
        user: null,
        propsHistory: ""
    }
  }


  searchBar = (e) => {
      this.setState({
          searchBarText: e.target.value,
      }, () => {
          if (this.state.searchBarText.length > 0){
              axios.get(`https://www.boardgameatlas.com/api/game-names?client_id=snrWFZ0nvl&limit=10&name=${this.state.searchBarText}`)
              .then((theResult) => {
                  this.setState({
                      searchBarResults: theResult.data.names,
                  })
              })
          } else {
              this.setState({
                  searchBarResults: null,
              })
          }
      })
  }

  clearBar = () => {
    this.setState({
        searchBarText: "",
        searchBarResults: null,
    })
  }


  showSuggestions = () => {
      return this.state.searchBarResults.map((eachGame) => {

          return (
              <li key={eachGame} className="search-bar-suggestion" >
                  <Link to = {`/search/${eachGame}`} onClick={this.clearBar}>
                      {eachGame}
                  </Link>
              </li>
          )
      })
  }

  formSubmition = (e) => {
      e.preventDefault();
      if (this.state.searchBarText.length > 0){
          this.props.history.push(`/search/${this.state.searchBarText}`)
      }
  }

  atlasLogin = (search) => {
    let token = queryString.parse(search).code;
    let body = {
    'client_id' : 'snrWFZ0nvl',
    'client_secret' : '0cd69e59d15381b3109efa7c5d2d730b',
    'code' : token,
    'redirect_uri' : 'http://localhost:3000/',
    'grant_type' : 'authorization_code'
    }; 
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }   
  axios.post('https://www.boardgameatlas.com/oauth/token', qs.stringify(body), config)
    .then((result) => {
        this.setState({
            atlasAccountToken: result.data.access_token,
        }, () => {
            console.log(this.state.atlasAccountToken);
            this.getUserData();
        })
    })
    .catch((err) => {
      console.log(err);
    })
}

getUserData = () => {
    const config = {
        headers: {
          Authorization: `Bearer ${this.state.atlasAccountToken}`
        }
      }   
    axios.get('https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/user/data?client_id=snrWFZ0nvl', config)
    .then((res) => {
        this.setState({
            user: res.data.user,
        }, () => {
            console.log(this.state.user.username);
        })
    })
    .catch((err) => {
        console.log(err);
    })
}



  render(){
    return (
      <div className="App">
      <NavBar {...this.props}
      formSubmition = {this.formSubmition}
      showSuggestions = {this.showSuggestions}
      clearBar = {this.clearBar}
      searchBar = {this.searchBar}
      searchBarText = {this.state.searchBarText}
      searchBarResults = {this.state.searchBarResults}
      />
          <Switch>
            <Route exact path="/" render = {(props)=>
            <HomePage {...props} 
            atlasLogin = {this.atlasLogin}
            getUserData = {this.getUserData}
            atlasAccountToken = {this.state.atlasAccountToken}
            user = {this.state.user}
            />}/>
  
            <Route exact path="/search/:id" render = {(props)=>
            <BoardGameSearch
              {...props}
            />}/>
  
            <Route exact path="/search/:name/:id" render = {(props) => 
            <BoardGame 
              {...props}
              />}/>
          </Switch>
  
        
      </div>
    )
  }

}

export default App;
