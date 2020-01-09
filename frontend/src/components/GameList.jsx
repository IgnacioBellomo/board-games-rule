import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class GameList extends Component {


    gamesList = () => {
        if(this.props.gameList){
            console.log(this.props.gameList);
            return this.props.gameList.map(game => {
                return (
                    <div className={`col-6 col-md-4 text-center mb-5 key=${game.id}`}>
                        <div className="rulebook-link">
                            <Link to={{
                                pathname: `/search/${game.name}/${game.id}`,
                                state: {
                                    gameInfo: game
                                }
                                }}>
                                    <h5>{game.name}</h5>
                                    <img src={game.images.small} alt="image of the game"/>
                            </Link>
                            <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => {this.props.removeGame(this.props.gameListID, game.id, game.name)}}>Remove from list</button>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        if (this.props.gameList){
            return (
                <div className="container">
                    <div className="row">
                    <div className="col-12">
                        {this.props.user.username &&
                            <h1>Welcome, {this.props.user.username}</h1>
                        }
                        {this.props.user.firstName &&
                            <h1>Welcome, {this.props.user.firstName}</h1>
                        }  
                        <h3 className="text-center mb-5">Your rulebooks</h3>
                    </div> 
                        {this.gamesList()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.props.user.username &&
                                <h1>Welcome, {this.props.user.username}</h1>
                            }
                            {this.props.user.firstName &&
                                <h1>Welcome, {this.props.user.firstName}</h1>
                            }  
                        </div>
                        <div className="col-12">
                            <div>
                                <h5>Create a list to keep all of your rulebooks in one place!</h5>
                            </div>
                            <div>
                                <h6>Search for a rulebook you'd like to store and click the Add to List button to get your list started. All of your games will be displayed in the home page.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
