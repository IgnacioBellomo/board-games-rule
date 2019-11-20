import React, { Component } from 'react'
import axios from 'axios';
import { throwStatement } from '@babel/types';
import { Link } from 'react-router-dom'


export default class BoardGameSearch extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            theGame: null,
        }
    }

    componentDidMount(){
        this.gameInfo();
    }

    shouldComponentUpdate(props){
        if (this.props !== props){
            console.log(props.match.params.id);
            axios.get(`https://www.boardgameatlas.com/api/search?name=${props.match.params.id}&client_id=snrWFZ0nvl`)
            .then((res) => {
                this.setState({theGame: res.data.games})
            })
        }
        return true
    }
    
    gameInfo = () => {
        axios.get(`https://www.boardgameatlas.com/api/search?name=${this.props.match.params.id}&client_id=snrWFZ0nvl`)
        .then((res) => {
            console.log(res);
            this.setState({theGame: res.data.games})
        })
    }

    showAllGames = () => {
        let words = this.props.match.params.id.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(" ");
        let newGames = this.state.theGame.filter((game) => {
            let otherWords = game.name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(" ");
            if (!words.every(word => otherWords.includes(word))){
                console.log(game);
            }
            return words.every(word => otherWords.includes(word))
        }).map((game) => {
            return (
                <div className="col-4 single-boardgame">
                    <img src={game.image_url} />
                    <Link to={`/${game.name}`} gameID={game.id}>
                        <h3>{game.name}</h3>
                    </Link>
                </div>
            )

        }) 
        return newGames
    }

    render() {
        if (this.state.theGame) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        {this.showAllGames()}
                    </div>
                </div>
            )
        } else {
            return (
            <div>
                <h1>Loading...</h1>
            </div>
            )
        }      
    }
}