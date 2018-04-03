import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

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
                    <Link to='/spin-results'><button>SpinResults</button></Link>
                    <Link to='/friends-list'><button>Invite Friends</button></Link>
                </div>
            </div>
        )
    }
}