import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class HomePage extends Component {
    
    state = {
        search: null,
        showGameList: false,
    }

    componentDidMount(){
        if (this.props.history.location.search.includes('code')){
            this.setState({
                search: this.props.history.location.search
            }, () => {
                this.props.atlasLogin(this.state.search);
            })
        }
    }
    gamesList = () => {
        if(this.props.userList){
            return this.props.userList.map(game => {
                return (
                    <div className={`rulebook-link col-6 text-left key=${game.id}`}>
                    <img src={game.images.thumb} alt="image of the game"/>
                        <Link to={{
                            pathname: `/search/${game.name}/${game.id}`,
                            state: {
                                gameInfo: game
                            }
                            }}>{game.name}</Link>
                    </div>
                )
            })
        }
    }

    toggleGamesList = () => {
        this.setState({
            showGamesList: !this.state.showGamesList
        })
    }


    render() {
        return (
            <div>
                <div className="homepage-banner">
                </div>
                <div className="jumbotron-image">
                        <h1>Rulebooks for everyone.</h1>
                        <p>Don't pass the book, send the link!</p>      
                </div>
                <div className="jumbo-relative">
                    <div className="container">
                        {!this.props.user && !this.props.history.location.search.includes('code') &&
                        <div className="row">
                            <div className="col-12 col-md-4 page-info">
                                <h3>All your rulebooks in one page</h3>
                                <div><b>- </b>We are powered by <a className ="badge badge-light" href='https://www.boardgameatlas.com/'><img src={require("../boardgameatlas-logo.png")} alt="Board game atlas logo"/> Board Game Atlas</a>, a dynamic site
                                that is constantly being updated. We have links to thousands of board game rulebooks</div>
                                <div><b>- </b>Connect your Board Game Atlas account to import your games list and have all your rulebooks in one easy-to-access site</div>
                                <div></div>
                            </div>
                            <div className="col-12 col-md-4 page-info">
                                <h3>Use BGR when:</h3>
                                <div><b>- </b>You're confused about the game, but that one friend is hogging the rulebook</div>
                                <div><b>- </b>Planning a first time play through of a game and no one knows the rules</div>
                                <div><b>- </b>You're a weirdo who likes to read board game rulebooks for fun</div>
                            </div>
                            <div className="col-12 col-md-4 page-info">
                                <h3>Ready to go?</h3> 
                                <div>Click the button below to sign in and enjoy all of the benefits of Board Game Atlas</div>
                                    <a href="https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=snrWFZ0nvl&redirect_uri=https://board-games-rule.herokuapp.com/&state=wtf" className="badge badge-secondary">Connect to BGA</a>
                                <div>You can navigate our site and access rulebooks without logging in, but you will not be able to create a rulebook list.</div>
                            </div>
                        </div>
                        }
                        {this.props.user && 
                        <div className="row">
                            <div className="col-12 col-md-6 page-info">
                                <h1>You are logged in as: {this.props.user.username}</h1> 
                                {this.props.userList &&
                                    <button type="button" className="btn btn-danger" onClick={this.toggleGamesList}>
                                        View your rulebooks
                                    </button>
                                }
                                {!this.props.userList &&
                                    <div>
                                        <div>
                                            Create a list to keep all of your rulebooks in one place!
                                        </div>
                                        <div>
                                            Search for a rulebook you'd like to store and click the Add to List button to get your list started.
                                        </div>
                                    </div>
                                }
                            </div>
                            {this.state.showGamesList &&
                                <div className="col-12 col-md-6 rulebook-list">
                                    <button type="button" className="close float-right" aria-label="Close" onClick={this.toggleGamesList}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <div className="row">
                                    <div className="col-12">
                                        <h3 className="text-left mb-1 rules-header">Your Rulebooks</h3>
                                    </div>
                                        {this.gamesList()}
                                    </div>     
                                </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
