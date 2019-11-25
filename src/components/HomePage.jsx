import React, { Component } from 'react'
import axios from 'axios';

export default class HomePage extends Component {
    
    state = {
        search: null,
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
                <div className="jumbotron-image">
                        <h1>Rulebooks for everyone.</h1>
                        <p>Don't pass the book, send the link!</p>      
                </div>
                <div className="jumbo-relative">
                    <div className="container">
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
                        {!this.props.user && 
                            <div className="col-12 col-md-4 page-info">
                                <h3>Ready to go?</h3> 
                                <div>Click the button below to sign in and enjoy all of the benefits of Board Game Atlas</div>
                                    <a href="https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=snrWFZ0nvl&redirect_uri=http://localhost:3000/&state=wtf" className="badge badge-secondary">Connect to BGA</a>
                                <div>You can navigate our site and access rulebooks without logging in, but you will not be able to create a rulebook list.</div>
                            </div>
                        }
                        {this.props.user && 
                            <div className="col-12 col-md-4 page-info">
                                <h3>Welcome {this.props.user.username}</h3> 
                                <div>More features coming soon..</div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
