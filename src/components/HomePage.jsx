import React, { Component } from 'react'
import axios from 'axios';
import NavBar from './NavBar';

export default class HomePage extends Component {
    

    grabGame = (gameName) => {
        axios.get(`https://www.boardgameatlas.com/api/search?name=${gameName}&exact=true&client_id=snrWFZ0nvl`)
        .then((theResult)=>{     
        let x = theResult.data;
        this.setState({games: x})
        })
        .catch((err)=>{
        console.log(err);
        })
    }




    render() {
        return (
            <div>
                <h1>No rulebooks added yet :(</h1>
                <h2>Help us by contributing to the site!</h2>
            </div>
        )
    }
}
