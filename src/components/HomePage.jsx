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
                <div className="jumbotron homepage-banner">
                    <h1>Rulebooks for everyone.</h1>      
                    <p>Modern board games pack thick and heavy rulebooks, and are generally used as a reference for first-time players. I'm tired of passing it around,
                    let's instead get them all online so we can send a link instead of waiting for a turn! And imagine how much lighter our game boxes would be...
                    </p>
                </div>
                <h1>No rulebooks added yet :(</h1>
                <h2>Help us by contributing to the site!</h2>
            </div>
        )
    }
}
