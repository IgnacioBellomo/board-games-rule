import React, { Component, Fragment } from 'react';
import actions from '../../services/index'
import classNames from 'classnames';

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        emailClass : 'form-control input-lg',
        emailMessage: "",
        password: "",
        confirmPassword: "",
        submissionAttempt: false,
    } 
    handleChange = async e => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.submissionAttempt){
            this.isValidEmail();
        }
    }

    validator = input => {
        switch (input){
            case 'firstName':
            case 'lastName':
                if (this.state[input].length < 1) {
                    let message = 'Field cannot be empty';
                    return {valid: false, message: message};
                } else {
                    return {valid: true}
                }
            case 'password':
            case 'confirmPassword':
                if (this.state.password.length < 6) {
                    let message = 'Password must be at least 6 characters long.';
                    return {valid: false, message: message};
                } else if (this.state.password !== this.state.confirmPassword){
                    let message = 'Password do not match.';
                    return {valid: false, message: message};
                } else {
                    return {valid: true}
                }
            default:
                break;
        }
    }

    isValid = input => {
        let wert = {}
        if (this.state.submissionAttempt){
            let valid = this.validator(input);
            if (valid.message){
                wert.message = valid.message;
                wert.class = classNames('form-control', 'input-lg', 'is-invalid');
            } else {
                wert.message = "";
                wert.class = classNames('form-control', 'input-lg', 'is-valid' );
            } return wert;
        } else {
            wert.class = classNames('form-control', 'input-lg');
            wert.message = "";
            return wert;
        }  
    }

    isValidEmail = () => {
        if (this.state.submissionAttempt){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){ 
                actions.validEmail(this.state.email)
                .then((validEmail) => {
                    if (validEmail.data.free){
                        let theClass = classNames('form-control', 'input-lg', 'is-valid');
                        this.setState({
                            emailClass: theClass,
                            emailMessage: ""
                        })
                    } else {
                        let message = 'That email is already in use, please choose another.';
                        let theClass = classNames('form-control', 'input-lg', 'is-invalid');
                        this.setState({
                            emailClass: theClass,
                            emailMessage: message
                        })
                    }
                })
            } else {
                let message = 'Invalid email address.';
                let theClass = classNames('form-control', 'input-lg', 'is-invalid');
                this.setState({
                    emailClass: theClass,
                    emailMessage: message
                })
            }
        } else {
            let theClass = classNames('form-control', 'input-lg');
            this.setState({
                emailClass: theClass
            })
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        await this.setState({
            submissionAttempt: true
        })
        let allValid = true;
        let formValues = ['firstName', 'lastName', 'password'];
        for (let value of formValues){
            if (this.validator(value).valid) {
                continue;
            } else {
                allValid = false;
            }
        }
        this.isValidEmail();
        if (this.state.emailMessage.length > 0){
            allValid = false;
        }
        if (allValid) {
            let user = await actions.signUp({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            });
            this.props.setUser({...user.data});
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 col-md-6 offset-1 offset-md-3">
                        <form acceptCharset="utf-8" className="form" role="form" onSubmit={this.handleSubmit}>   <legend className="white">Sign Up</legend>
                            <div className="row">
                                <div className="col-12 mb-2 col-md-6">
                                    <input type="text" name="firstName" value={this.state.firstName} className={this.isValid('firstName').class} onChange={this.handleChange} placeholder="First Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                                <div className="col-12 mb-2 col-md-6">
                                    <input type="text" name="lastName" value={this.state.lastName} className={this.isValid('lastName').class} onChange={this.handleChange} placeholder="Last Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <input type="email" name="email" value={this.state.email} className={this.state.emailClass} onChange={this.handleChange} placeholder="Your Email"/>
                                <div className="valid-feedback text-left">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback text-left">
                                    {this.state.emailMessage}
                                </div>
                            </div>
                            <div className="mb-2">
                                <input type="password" name="password" value={this.state.password} className={this.isValid('password').class} onChange={this.handleChange} placeholder="Password"/>
                                <div className="valid-feedback text-left">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback text-left">
                                    {this.isValid('password').message}
                                </div>
                            </div>
                            <div className="mb-2">
                                <input type="password" name="confirmPassword" value={this.state.confirmPassword} className={this.isValid('confirmPassword').class} onChange={this.handleChange} placeholder="Confirm Password"/>
                                <div className="valid-feedback text-left">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback text-left">
                                    {this.isValid('confirmPassword').message}
                                </div>
                            </div>
                            <br />
                            <button className="btn btn-lg btn-primary btn-block signup-btn" type="submit">
                                Create my account
                            </button>
                        </form>          
                    </div>
                </div>          
            </div>
        );
    }
}

export default SignUp;