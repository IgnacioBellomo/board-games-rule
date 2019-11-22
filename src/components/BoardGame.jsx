import React, { Component } from 'react'
import Profile from './Profile';
import {Link} from 'react-router-dom';

export default class BoardGame extends Component {
    state = {
        formEmail: "",
    }

    updateEmail = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        }, () => {
            console.log(this.state.formEmail)
        })
    }
    render() {
        let game;
        if (this.props.location.state){
            game = this.props.location.state.gameInfo;
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-0 col-lg-1">
                            </div>
                            <div className="col-6 col-lg-5 boardgame-img">
                                <img src={game.image_url} alt={'image of ' + game.name}/>
                            </div>
                            <div className="col-4 boardgame-info">
                                <h1>{game.name} <h3>({game.year_published})</h3></h1>
                                {game.rules_url &&
                                    <div>
                                        <div>
                                            <a className="btn btn-danger" href={game.rules_url} target="_blank">Rules for {game.name}</a>
                                        </div>
                                        {/* <div>
                                            Is our link not working? Click the button below to notify us and we will look into it!
                                        </div>
                                        <button type="button" className="btn btn-primary">Click me!</button> */}
                                </div>
                                }
                                {!game.rules_url &&
                                    <div className="please-give-rules">
                                        <div>No rules for {game.name} available.</div>
                                        <div>Leave your email below to notify us and we will look into getting it for you. You will be notified via email when it's added.</div>
                                        <br/>
                                        <form className="form-inline">
                                            <div className="form-group mx-sm-3 mb-2">
                                                <input type="email" className="form-control" name="formEmail" value={this.state.formEmail} placeholder="Email" onChange={this.updateEmail}/>
                                            </div>
                                            <button type="submit" className="btn btn-danger mb-2">Submit</button>
                                        </form>
                                    </div>
                                }
                            </div>
                            <div className="col-12 game-desc">
                            <h4>Description:</h4>
                                <p>{game.description}</p>
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
                                    <h1>
                                        Oops!</h1>
                                    <h2>
                                        404 Not Found</h2>
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
