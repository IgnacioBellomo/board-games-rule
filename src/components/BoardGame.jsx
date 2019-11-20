import React, { Component } from 'react'

export default class BoardGame extends Component {

    render() {
        let game = this.props.location.state.gameInfo;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img src={game.image_url} alt={'image of ' + game.name}/>
                    </div>
                </div>
            </div>
        )
    }
}
