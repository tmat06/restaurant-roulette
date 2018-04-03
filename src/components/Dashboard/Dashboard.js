import React, { Component } from 'react';
import Nav from './../Nav/Nav';

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Nav />
                <div style={{ backgroundColor: 'grey', height: '100vh', width: '100%' }}>
                    Dashboard
                </div>
            </div>
        )
    }
}