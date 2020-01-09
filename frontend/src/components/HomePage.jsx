import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import GameList from './GameList';


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


    render() {
        if (this.props.user){
            return (
                <GameList
                {...this.props}
                gameList = {this.props.gameList}
                user = {this.props.user}
                removeGame = {this.props.removeGame}
                gameListID = {this.props.gameListID}  
                />
            )
        } else {
        return (
            <Fragment>
                <div className="homepage-banner">
                </div>
                <div className="jumbotron-image">
                {!this.props.history.location.search.includes('code') &&
                <div>
                    <h1>Rulebooks for everyone.</h1>
                    <p>Don't pass the book, send the link!</p>  
                </div>
                }
                {this.props.history.location.search.includes('code') &&
                    <div>
                        <h1>Loading...</h1>
                    </div>
                }
                </div>
                <div className="jumbo-relative">
                    <div className="container">
                        {!this.props.user && !this.props.history.location.search.includes('code') &&
                        <div className="row">
                            <div className="col-12 col-md-4 page-info">
                                <h3>Use us if you </h3>
                                <div><b>- </b>Plan a first time play through of a game and no one knows the rules</div>
                                <div><b>- </b>Enjoy reading through the rules of a game you plan to purchase before purchasing it</div>
                                <div><b>- </b>Are confused about the game, but that one friend is hogging the rulebook</div>
                            </div>
                            <div className="col-12 col-md-4 page-info">
                                <h3>All your rulebooks in one page</h3>
                                <div><b>- </b>We are powered by <a className ="badge badge-light" href='https://www.boardgameatlas.com/'><img src={require("../boardgameatlas-logo.png")} alt="Board game atlas logo"/> Board Game Atlas</a>, a dynamic site
                                that is constantly being updated. We have links to thousands of board game rulebooks</div>
                                <div><b>- </b>Connect your Board Game Atlas account to import your games list and have all your rulebooks in one easy-to-access site</div>
                                <div></div>
                            </div>
                            <div className="col-12 col-md-4 page-info">
                                <h3>Ready to go?</h3> 
                                <div>Click the button to log in to <a href="https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=snrWFZ0nvl&redirect_uri=http://localhost:3000/&state=wtf" className="badge badge-light"><img src={require("../boardgameatlas-logo.png")} alt="Board game atlas logo"/> Board Game Atlas</a> and import your game lists, Or log in to <Link to = {'/login'} className="badge badge-danger">Board Games Rule!</Link> and start creating some lists! </div>
                            </div>
                        </div>
                        }
                        {this.props.user && 
                        <div className="row">
                            <div className="col-12 col-md-6 page-info">
                                <h1>You are logged in as: {this.props.user.username}</h1> 
                                {this.props.gameList &&
                                    <button type="button" className="btn btn-danger" onClick={this.toggleGamesList}>
                                        View your rulebooks
                                    </button>
                                }
                                {!this.props.gameList &&
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
                                        {this.props.gameList.length > 10 &&
                                            <div className="col-12 text-center">
                                                <Link to={{
                                                    pathname: `/mylist`
                                                }}>See your full list</Link>
                                            </div>
                                        }

                                    </div>     
                                </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
    }
}
