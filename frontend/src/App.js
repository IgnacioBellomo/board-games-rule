import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {Switch, Route} from 'react-router-dom';
import BoardGameSearch from './components/BoardGameSearch';
import BoardGame from './components/BoardGame';
import NavBar from './components/NavBar';
import axios from 'axios';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import qs from 'querystring';
import {myHistory} from './index.js'
import actions from './services/index';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';




class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        searchBarText: "",
        searchBarResults: null,
        atlasAccountToken: null,
        user: null,
        propsHistory: "",
        gameListID: null,
        gameList: null,
    }
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = async () => {
    let user = await actions.isLoggedIn();
    if (user.data.error && (!this.state.user || !this.state.user.username)){
      this.setState({
        user: null
      }, () => {
        console.log('Error code ' + user.data.error)
      })
    } else {
      this.setState({
        user: user.data
      })
    }
  }

  setUser = async (user) => {
    if (!user || !user.firstName || user.gamesList.length < 1){
      this.setState({
        user: user,
        gameList: null,
      })
    } else {
      let gamesList = await this.getUserGameList(user.gamesList);
      this.setState({
        user: user,
        gameList: gamesList,
      })
    }
}

  getUserGameList = async (list) => {
    let gameList = [];
    for (let id of list){
      let game = await axios.get(`https://www.boardgameatlas.com/api/search?ids=${id}&client_id=snrWFZ0nvl`)
      gameList.push(game.games[0]);
    }
    return gameList;
  }

  logOut = async () => {
    await actions.logOut();
    await this.setUser(null);
    myHistory.push('/');
  }

  searchBar = (e) => {
      this.setState({
          searchBarText: e.target.value,
      }, () => {
          if (this.state.searchBarText.length > 0){
              axios.get(`https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/game-names?client_id=snrWFZ0nvl&limit=10&name=${this.state.searchBarText}`)
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
          myHistory.push(`/search/${this.state.searchBarText}`)
      }
      this.clearBar();
  }


  // REDIRECT URI: https://board-games-rule.herokuapp.com/
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
        this.getUserListID(res.data.user.username)
          this.setState({
              user: res.data.user,
          })
      })
      .catch((err) => {
          console.log(err);
      })
  }

getUserListID = (username) => { 
  axios.get(`https://www.boardgameatlas.com/api/lists?username=${username}&client_id=snrWFZ0nvl`)
  .then((res) => {
    let list = null;
    for (let i = 0; i < res.data.lists.length; i++){
      if (res.data.lists[i].name === "Your Rulebooks"){
        list = res.data.lists[i].id;
      }
    }
      this.setState({
          gameListID: list,
      }, () => {
          this.getUserList(this.state.gameListID)
      })
  })
  .catch((err) => {
      console.log(err);
  })
}

getUserList = (id) => {
  axios.get(`https://www.boardgameatlas.com/api/search?list_id=${id}&client_id=snrWFZ0nvl`)
  .then((res) => {
    this.setState({
      gameList: res.data.games,
    })
  })
}

createList = (gameId) => {
  if (this.state.gameListID){
    this.addGameToList(this.state.gameListID, gameId);
  } else {
    let body = {
      "name": "Your Rulebooks"
    }; 
  const config = {
    headers: {
      'Authorization': `Bearer ${this.state.atlasAccountToken}`,
    }
  }   
  axios.post('https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/lists?client_id=snrWFZ0nvl', qs.stringify(body), config)
    .then((res) => {
      this.addGameToList(res.data.list.id, gameId)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  }


addGameToList = (listID, gameID) => {
  let body = {
    "list_id": listID,
    "game_id": gameID
  }; 
const config = {
  headers: {
    'Authorization': `Bearer ${this.state.atlasAccountToken}`,
  }
}   
axios.post('https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/lists/add?client_id=snrWFZ0nvl', qs.stringify(body), config)
  .then((res) => {
    console.log(res.data);
    this.getUserList(listID);
  })
  .catch((err) => {
    console.log(err);
  })
}

removeGame = (listID, gameID) => {
  let body = {
    "list_id": listID,
    "game_id": gameID,
  }; 
  const config = {
    headers: {
      'Authorization': `Bearer ${this.state.atlasAccountToken}`,
    }
  } 
  axios.delete('https://cors-anywhere.herokuapp.com/https://www.boardgameatlas.com/api/lists?client_id=snrWFZ0nvl', qs.stringify(body), config)
  .then((res) => {
    console.log(res.data);
    this.getUserList(listID);
  })
  .catch((err) => {
    console.log(err);
  })

}




  render(){
    console.log(this.state.user);
    return (
      <div className="App">
        <NavBar {...this.props}
        formSubmition     = {this.formSubmition}
        showSuggestions   = {this.showSuggestions}
        clearBar          = {this.clearBar}
        searchBar         = {this.searchBar}
        searchBarText     = {this.state.searchBarText}
        searchBarResults  = {this.state.searchBarResults}
        user              = {this.state.user}
        gameList          = {this.state.gameList}
        logOut            = {this.logOut}
        />
        <Switch>
          <Route exact path="/" render = {(props)=>
          <HomePage {...props} 
          atlasLogin        = {this.atlasLogin}
          getUserData       = {this.getUserData}
          atlasAccountToken = {this.state.atlasAccountToken}
          user              = {this.state.user}
          gameList          = {this.state.gameList}
          createList        = {this.createList}
          removeGame        = {this.removeGame}
          gameListID        = {this.state.gameListID}
          />}/>

          <Route exact path="/search/:id" render = {(props)=>
          <BoardGameSearch
            {...props}
          />}/>

          <Route exact path="/search/:name/:id" render = {(props) => 
          <BoardGame 
            {...props}
            user        = {this.state.user}
            createList  = {this.createList}
            gameList    = {this.state.gameList}
            removeGame  = {this.removeGame}
            />}/>

          <Route exact path="/login" render = {(props) => 
          <LogIn
            {...props}
            setUser = {this.setUser}  
          />}/>

          <Route exact path="/signup" render = {(props) => 
          <SignUp
            {...props}
            setUser = {this.setUser}
          />}/>
          
        </Switch>
  
        
      </div>
    )
  }

}

export default App;
