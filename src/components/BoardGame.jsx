import React, { Component } from 'react'
import axios from 'axios';
import { throwStatement } from '@babel/types';

export default class BoardGame extends Component {
    
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
        console.log('times');
        if (this.props !== props){
            console.log('test')
            axios.get(`https://www.boardgameatlas.com/api/search?name=${props.match.params.id}&exact=true&client_id=snrWFZ0nvl`)
            .then((res) => {
                this.setState({theGame: res.data.games[0]})
            })
        }
        return true
    }
    
    gameInfo = () => {
        axios.get(`https://www.boardgameatlas.com/api/search?name=${this.props.match.params.id}&exact=true&client_id=snrWFZ0nvl`)
        .then((res) => {
            console.log(res);
            this.setState({theGame: res.data.games[0]})
        })
    }

    render() {
        if (this.state.theGame) {
            return (
                <div>
                    <h1>{this.state.theGame.name}</h1>
                    <h3>{this.state.theGame.designers[0]}</h3>
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