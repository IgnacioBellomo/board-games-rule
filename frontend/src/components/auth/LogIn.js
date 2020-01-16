import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import actions from '../../services/index'

class LogIn extends Component {

    state = {
        incorrect: false,
    } 

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        actions.logIn(this.state)
        .then((res)=>{
            this.props.setUser({...res.data})
            this.props.history.push("/")})
        .catch((err)=>{
            console.log(err)
            this.incorrect()});
    }

    incorrect = () =>{
        this.setState({
            incorrect: true
        })
        setTimeout(() => {
            this.setState({incorrect: false})
        }, 3000);
    }

    render() {
        return (
            <Fragment>
                <div className="logreg-forms">
                    <form className="form-signin" onSubmit={this.handleSubmit}>
                        <h1 className="mb-3 text-center"> Log in</h1>
                        <div className="social-login">
                            <a href="https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=snrWFZ0nvl&redirect_uri=https://board-games-rule.herokuapp.com/&state=wtf" className="btn bga-btn btn-sm"><img src={require("../../boardgameatlas-logo.png")} alt="Board game atlas logo"/>Log in with Board Game Atlas</a>
                        </div>
                        <p className="text-center h5 mb-3"> OR  </p>
                        <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.handleChange} autofocus=""/>
                        <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.handleChange}/>  
                        <button className="btn btn-success btn-block" type="submit">Log in</button>
                        {/* <a href="#" id="forgot_pswd">Forgot password?</a> */}
                        <hr/>
                        <p>Don't have an account!</p>
                        <Link to="/signup" className="btn btn-primary btn-block" type="button" id="btn-signup"> Sign up for a new account</Link>
                    </form>
                    <br/>     
                </div>
                {this.state.incorrect &&
                <p>
                    Username or password incorrect, please try again.
                </p>
                }
            </Fragment>
        );
    }
}

export default LogIn;