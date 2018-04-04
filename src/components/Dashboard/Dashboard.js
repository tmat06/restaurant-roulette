import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { getUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            cityInput: ''
        }
    }

    componentDidMount() {
        this.props.getUserInfo();
        axios.get('/auth/me').then( results => {
        })
    }

    updateCity(e){
        this.setState({
            cityInput: e.target.value
        })
    }

    render() {
        console.log('dashboard', this.props.user);
        return (
            <div>
                <Nav />
                <div style={{ backgroundColor: 'grey', height: '100vh', width: '100%' }}>
                    Dashboard
                    <br />
                    <Link to='/friends-list'><button>Invite Friends</button></Link>
                    <br />
                    <input placeholder="type in your city" onChange={(e) => this.updateCity(e)}/>
                    <br />
                    {this.state.cityInput}
                    <br />
                    <Link to='/spin-results'><button onClick={() => this.addCityToRedux()}>SpinResults</button></Link>
                    <br />
                    <a href="/auth/logout"><button>LogOut</button></a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUserInfo })(Dashboard);