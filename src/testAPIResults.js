import axios from 'axios';
import React, { Component } from 'react'

export default class TestAPIResults extends Component {
    render() {
        axios.post('https://ironrest.herokuapp.com/createCollection/ignacio').then(res => {
            console.log(res)
        })
        return (
            <div>
                
            </div>
        )
    }
}

