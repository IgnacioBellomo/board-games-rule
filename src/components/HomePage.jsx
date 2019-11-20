import React, { Component } from 'react'
import axios from 'axios';

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
                <div className="homepage-banner">
                </div>
                <div className="jumbotron">
                        <h1>Rulebooks for everyone.</h1>
                        <p>Don't pass the book, send the link!</p>      
                </div>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h1>No rulebooks added yet :(</h1>
                            </div>
                            <div className="col-4">
                                recent add
                            </div>
                            <div className="col-4">
                                recent add
                            </div>
                            <div className="col-4">
                                recent add
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
