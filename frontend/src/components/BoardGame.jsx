import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 

export default class BoardGame extends Component {
    state = {
        game: null,
        mechanics: [],
        onList: null,
    }
    
    componentDidMount () {
        if (this.props.location.state){
            this.setState({
                game: this.props.location.state.gameInfo,
            }, () => {
                this.mechanics();
            })
        }
    }

    mechanics = () => {
        let onList = false;
        let oneTime = false;
        if (this.state.game){
            if (this.state.game.min_playtime && this.state.game.min_playtime == this.state.game.max_playtime){
                oneTime = true;
            }
            if (this.props.gameList){
                this.props.gameList.forEach((item) => {
                    console.log('item ',item)
                    console.log(this.state.game.id);
                    if (item.id === this.state.game.id) {
                        onList = true;
                        console.log('Game is on list')
                    }
                })
            }
            console.log('Game on list: ', onList);
            let mechanics = [];
            axios.get('https://www.boardgameatlas.com/api/game/mechanics?client_id=snrWFZ0nvl')
            .then((res) => {
                this.state.game.mechanics.forEach((mechanic) => {
                    res.data.mechanics.forEach((mech) => {
                        if (mech.id === mechanic.id){
                            mechanics.push(mech.name);
                        }
                    })
                });
                this.setState({
                    mechanics: mechanics,
                    onList: onList,
                    mechanicsExist: mechanics.length > 0,
                    oneTime: oneTime,
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    }

    showMechanics = () => {
        return this.state.mechanics.map((mechanic) => {
            return (
                <span className="col-6 text-left">
                    <b>{mechanic}</b>
                </span>
            )
        })
    }

    addGameToList = async (gameId) => {
        let newList = await this.props.createList(gameId);
        this.setState({
            onList: true,
        })
    }

    render() {
        let game;
        if (this.state.game){
            game = this.state.game;
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4 boardgame-img">
                                <img src={game.image_url} alt={'image of ' + game.name}/>
                                <div className="row">
                                    {game.rules_url &&
                                        <div className="col-12 game-rules text-center">
                                            <div>
                                                <a className="btn btn-danger btn-sm mb-2" href={game.rules_url} target="_blank">How to Play</a>
                                            </div>
                                            <div>
                                                {this.props.user && !this.state.onList &&
                                                    <button className="btn btn-secondary btn-sm" onClick={() => {this.addGameToList(game.id)}}>Add to list</button>
                                                }
                                                {this.props.user && this.state.onList &&
                                                    <span className="btn-secondary btn-sm">Added</span>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {!game.rules_url && !this.state.requestMade &&
                                        <div className="col-12 game-rules please-give-rules">
                                            <div><b>Rulebook is unavailable.</b></div>
                                        </div>
                                    }
                                    {!game.rules_url && this.state.requestMade &&
                                        <div className="col-12 game-rules">>
                                            <h3>Thank you!</h3>
                                        </div> 
                                    }
                                </div>
                            </div>
                            <div className="col-8 boardgame-info">
                                <div className="row">
                                    {this.state.mechanicsExist &&
                                        <Fragment>
                                        <div className="col-10 offset-1 col-md-5 offset-md-0">
                                            <h1>{game.name}</h1>
                                            {game.year_published &&
                                                <h3>
                                                    ({game.year_published})
                                                </h3>
                                            }
                                            {(game.min_players || game.min_playtime) &&
                                                <div className="game-data">
                                                    {game.min_players && game.max_players &&
                                                        <span className="text-center">
                                                            {game.min_players} - {game.max_players} players
                                                        </span>
                                                    }
                                                    {game.min_playtime && game.max_playtime &&
                                                        <span className="text-center">
                                                            Playtime: {game.min_playtime} - {game.max_playtime} minutes
                                                        </span>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className="col-10 offset-1 col-md-6 offset-md-0 game-data">
                                            <h6 className="text-center">Mechanics</h6>
                                            <div className="row">
                                                {this.showMechanics()}
                                            </div>
                                        </div>
                                        </Fragment>
                                    }
                                    {!this.state.mechanicsExist &&
                                        <div className="col-10 offset-1 col-md-12 offset-md-0">
                                            <h1>{game.name}</h1>
                                            {game.year_published &&
                                                <h3>
                                                    ({game.year_published})
                                                </h3>
                                            }
                                            {(game.min_players || game.min_playtime) &&
                                                <div className="game-data">
                                                    {game.min_players && game.max_players &&
                                                        <span className="text-center">
                                                            {game.min_players} - {game.max_players} players
                                                        </span>
                                                    }
                                                    {game.min_playtime && this.state.oneTime &&
                                                        <span className="text-center">
                                                            Playtime: {game.max_playtime} minutes
                                                        </span>
                                                    }
                                                    {game.min_playtime && !this.state.oneTime &&
                                                        <span className="text-center">
                                                            Playtime: {game.min_playtime} - {game.max_playtime} minutes
                                                        </span>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }

                                </div>

                                <div className="large-screen game-desc">
                                    <h4>Description:</h4>
                                    <div>{ReactHtmlParser (game.description) }</div>
                                </div>
                            </div>


                            <div className="col-12 col-md-8 game-desc small-screen">
                            <h4>Description:</h4>
                                <div>{ReactHtmlParser (game.description) }</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="error-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="error-template">
                                    <h1>Oops!</h1>
                                    <h2>404 Not Found</h2>
                                    <div className="error-details">
                                        Sorry, an error has occured, Requested page not found!
                                    </div>
                                    <div className="error-actions">
                                    <Link to = {'/'} className="btn btn-danger btn-lg">
                                        <span className="glyphicon glyphicon-home"></span>
                                        Take Me Home
                                    </Link>          
                                    {/* <a href="http://www.jquery2dotnet.com" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
