import React, { Component } from 'react'
import Profile from './Profile';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 

export default class BoardGame extends Component {
    state = {
        formEmail: "",
        requestMade: false,
        game: null,
        mechanics: [],
        notOnList: null,
    }
    
    componentDidMount () {
        if (this.props.location.state){
            this.setState({
                game: this.props.location.state.gameInfo,
            }, () => {
                this.mechanics();
                this.notOnList();
            })
        }
    }

    updateEmail = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        }, () => {
        })
    }

    mechanics = () => {
        let notOnList = true;
        if (this.state.game){
            if (this.props.userList){
                this.props.userList.forEach((item) => {
                    if (item.id === this.state.game.id) {
                        notOnList = false;
                    }
                })
            }
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
                    notOnList: notOnList,
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
                    {mechanic}
                </span>
            )
        })
    }


    notifyUs = () => {
        let rulesRequest = {};
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        if (this.state.formEmail.length > 0){
            rulesRequest.formEmail = this.state.formEmail;
            rulesRequest.gameId = this.props.location.state.gameInfo.id;
            rulesRequest.date = `${date} : ${time}`;
        }
        axios.post('https://ironrest.herokuapp.com/ignacio', rulesRequest)
        .then(() => {
            this.setState({
                requestMade: true,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    notOnList = () => {

        this.setState({

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
                                                <a className="btn btn-danger mb-2" href={game.rules_url} target="_blank">How to Play</a>
                                            </div>
                                            <div>
                                                {this.props.user && this.state.notOnList &&
                                                    <button className="btn btn-secondary" onClick={() => {this.props.createList(game.id)}}>Add to list</button>
                                                }  
                                            </div>
                                        </div>
                                    }
                                    {!game.rules_url && !this.state.requestMade &&
                                        <div className="col-12 game-rules please-give-rules">
                                            <div><b>No rules for {game.name} available.</b></div>
                                            <div>Leave your email below to notify us and we will look into getting it for you. You will be notified via email when it's added.</div>
                                            <br/>
                                            <div className="form-inline">
                                                <div className="form-group mx-sm-3 mb-2">
                                                    <input type="email" className="form-control" name="formEmail" value={this.state.formEmail} placeholder="Email" onChange={this.updateEmail}/>
                                                </div>
                                                <button type="submit" className="btn btn-danger mb-2 ml-1" onClick={this.notifyUs}>Submit</button>
                                            </div>
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
                                    <div className="col-12 col-md-5">
                                        <h1>{game.name}</h1>
                                        <h3>({game.year_published})</h3>
                                        <div className="game-data">
                                            <span className="text-center">{game.min_players} - {game.max_players} players</span>
                                            <span className="text-center">Playtime: {game.min_playtime} - {game.max_playtime} minutes</span>
                                    </div>
                                    </div>
                                    <div className="col-10 offset-1 col-md-6 offset-md-0 game-data">
                                        <h6 className="text-center">Mechanics</h6>
                                        <div className="row">
                                            {this.showMechanics()}
                                        </div>
                                    </div>
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
