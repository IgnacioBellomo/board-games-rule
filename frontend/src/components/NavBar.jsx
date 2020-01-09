import React, {Fragment, Component} from 'react'
import { Link} from 'react-router-dom'

export default class NavBar extends Component {
    state = {
        
    }
    render(){
        console.log('52 ', this.props.searchBarResults)
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link to = {'/'} className="navbar-brand">Board Games Rule!</Link>
                    <button className="navbar-toggler" type="button" onClick={this.props.clearBar} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto navbar-links">
                        <li className="nav-item">
                            <Link to = {'/'} className="nav-link">
                                Home
                            </Link>
                        </li>
                        {!this.props.user &&
                            <Fragment>
                                <li className="nav-item">
                                    <Link to = {'/login'} className="nav-link">
                                        Log in
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to = {'/signup'} className="nav-link">
                                        Sign up
                                    </Link>
                                </li>
                            </Fragment>
                        }
                        {this.props.user &&
                            <li className="nav-item">
                                <a className="nav-link log-out" onClick={this.props.logOut}>
                                    Log out
                                </a>
                            </li>
                        }
                        </ul>
                        <form className="form-inline my-2 my-lg-0 search-bar-form" onSubmit={this.props.formSubmition}>
                            <input className="form-control mr-sm-2 search-bar" type="search" value={this.props.searchBarText} onChange={this.props.searchBar} placeholder="Search for a rulebook" aria-label="Search"/>
                            {this.props.searchBarResults &&
                                <div className="auto-complete">
                                <ul>
                                    {this.props.showSuggestions()}
                                </ul>
                            </div>
                            } 
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
                        }
}
