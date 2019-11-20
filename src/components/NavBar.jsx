import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'

export default class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchBarText: "",
            searchBarResults: null,
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

    // grabGame = (gameName) => {
    //     let x;
    //     let theRoute;
    //     // axios.get(`https://www.boardgameatlas.com/api/search?name=${gameName}&exact=true&client_id=snrWFZ0nvl`)
    //     // .then((res)=>{     
    //     // x = res.data.games[0];
    //     // theRoute = `/games/${x.id}`;
    //     // }, () => {
    //     return <Redirect to={theRoute}
    //     theGame = {x}
    //         />
    //     // })
    //     // .catch((err)=>{
    //     // console.log(err);
    //     // })
    // onClick={() => {this.grabGame(eachGame)}}
    // }

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

    render() {
        return (
            <div>
            
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link to = {'/'} className="navbar-brand">BGR</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto navbar-links">
                        <li className="nav-item">
                            <Link to = {'/'} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0 search-bar-form" onSubmit={this.formSubmition}>
                            <input className="form-control mr-sm-2 search-bar" type="search" value={this.state.searchBarText} onChange={this.searchBar} placeholder="Search for a game" aria-label="Search"/>
                            {this.state.searchBarResults &&
                                <div className="auto-complete">
                                <ul>
                                    {this.showSuggestions()}
                                </ul>
                            </div>
                            }
                            
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    </nav>
            </div>
        )
    }
}
