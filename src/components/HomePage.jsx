import React, { Component } from 'react'
import axios from 'axios';
import NavBar from './NavBar';


export default class HomePage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            searchBarText: "",
            searchBarResults: null,
            searchDisplay: null,
        }
    }

    componentDidMount(){
        this.grabListOfGames();
    }

    grabListOfGames = (name, ) => {
        axios.get('https://www.boardgameatlas.com/api/search?name=Catan&pretty=true&client_id=snrWFZ0nvl')
        .then((theResult)=>{     
        let x = theResult.data;
        this.setState({games: x})
        })
        .catch((err)=>{
        console.log(err);
        })
    }

    searchBar = (e) => {
        this.setState({
            searchBarText: e.target.value,
        }, () => {
            console.log(this.state.searchBarText);
            if(this.state.searchBarText.length < 4){
                axios.get(`https://www.boardgameatlas.com/api/game-names?client_id=snrWFZ0nvl&name=${this.searchBarText}`)
                .then((theResult) => {
                    this.setState({
                        searchBarResults: theResult.data.names,
                        searchDisplay: theResult.data.names,
                    })
                })
            } else {
                let filteredResults = [...this.searchBarResults].filter((game) => {
                    return game.name.toLowerCase().includes(this.searchBarText.toLowerCase());
                });
                this.setState({
                    searchDisplay: filteredResults,
                })
            }
        })
    }


    render() {
        console.log(this.state.games);
        return (
            <div>
                <NavBar 
                searchResults={this.state.searchDisplay}
                searchText={this.state.searchBarText}
                searchFunction={this.searchBar}
                />
            </div>
        )
    }
}
