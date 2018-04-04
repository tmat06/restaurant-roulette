import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { getUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            address: 'Provo, UT'

        }
        this.onChange = (address) => this.setState({
            address
        })

    }
    componentDidMount() {

        this.props.getUserInfo();
        axios.get('/auth/me').then(results => {
            // console.log('results', results)
            this.setState({
                username: results.data.display_name
            })
        })
    }

    handleEnter() {
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.log('error', error))
    }

    render() {
        console.log('dashboard', this.props.user);
        console.log('this.state.address', this.state.address)
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange
        }
        const myStyles = {
            root: {
                width: '50vw',
                borderRadius: '25px'
            },
            input: {
                backgroundColor: '#FFE49F',
                width: '50vw',
                fontFamily: 'Carter One, cursive',
                borderRadius: '25px',
                display: 'flex',
                justifyContent: 'center'
            },
            autocompleteContainer: {
                backgroundColor: 'green',
                fontFamily: 'Carter One, cursive',
                width: '50vw',
                borderRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            autocompleteItem: {
                color: 'black',
                fontFamily: 'Carter One, cursive',
                width: '45vw',
                borderRadius: '25px',

            },
        }
        return (
            <div>
                <Nav />

                <div style={{ backgroundColor: 'grey', height: '100vh', width: '100%' }}>
                    Dashboard
                    <br />
                    <br />
                    <Link to='/friends-list'><button>Invite Friends</button></Link>
                    <br />
                    <div>
                        <PlacesAutocomplete inputProps={inputProps} highlightFirstSuggestion={true} styles={myStyles} onEnterKeyDown={() => this.handleEnter()} />
                    </div>

                    <br />
                    <Link to='/spin-results'><button onClick={() => this.handleEnter()}>SpinResults</button></Link>
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