import React, { Component } from 'react'
import axios from 'axios';
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
            axios.get(`https://www.boardgameatlas.com/api/search?name=${props.match.params.id}&client_id=snrWFZ0nvl`)
            .then((res) => {
                this.setState({
                    theGame: res.data.games
                })
            })
        }
        return true
    }
    
    gameInfo = () => {
        axios.get(`https://www.boardgameatlas.com/api/search?client_id=snrWFZ0nvl&name=${this.props.match.params.id}`)
        .then((res) => {
            console.log(res)
            this.setState({theGame: res.data.games})
        })
    }

    showAllGames = () => {
        let words = this.props.match.params.id.replace(/[&#,+()$~%.'":*?<>{}]/g, '').split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].toLowerCase();
        }
        let newGames = this.state.theGame.filter((game) => {
            let otherWords = game.name.replace(/[&#,+()$~%.'":*?<>{}]/g, '').split(" ");
            for (let i = 0; i < otherWords.length; i++) {
                otherWords[i] = otherWords[i].toLowerCase();
            }
            return words.every(word => otherWords.includes(word))
        }).map((game) => {
            return (
                <div className="col-4 single-boardgame" key={game.id}>
                    <img src={game.image_url} alt={'image of ' + game.name}/>
                    <Link to={{
                        pathname: `/search/${game.name}/${game.id}`,
                        state: {
                            gameInfo: game
                        }
                        }}><h3>{game.name}</h3></Link>
                </div>
            )

        }) 
        return newGames
    }

    render() {
        if (this.state.theGame) {
            return (
                <div className="search-results-body">
                    <div className="container-fluid">
                        <div className="row">
                            {this.showAllGames()}
                        </div>
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