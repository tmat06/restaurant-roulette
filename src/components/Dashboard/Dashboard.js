import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MotionStyledComp from './../MotionStyledComp/MotionStyledComp';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            address: 'Provo, UT'
        }
        this.onChange = (address) => this.setState({
            address
        })
    }
    componentDidMount() {
        this.props.getUserInfo();
    }

    handleEnter() {
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.props.updateRestaurantSearch(latLng);
                axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.restaurantSearch.lat},${this.props.restaurantSearch.lng}&radius=5000&type=restaurant&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
                    .then((res) => {
                        this.props.updateRestaurantList(res.data.results)
                    })
                this.props.history.push('/spin-results');
            })
            .catch(error => console.log('error', error))
    }

    render() {
        // console.log('dashboard', this.props);
        // console.log('dashboard', this.state);
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
        // console.log('this.props.restaurantSearch', this.props.restaurantSearch)
        // console.log('this.props.restaurantList', this.props.restaurantList)
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
                        <PlacesAutocomplete inputProps={inputProps} highlightFirstSuggestion={true} styles={myStyles} options={{ types: ['(cities)'] }} onEnterKeyDown={() => this.handleEnter()} />
                    </div>

                    <br />
                    <Link to='/spin-results'><button onClick={() => this.handleEnter()}>SpinResults</button></Link>

                    <br />
                    <button onClick={() => this.handleEnter()}>add restaurant search to redux</button>
                    <br />

                    <a href="/auth/logout"><button>LogOut</button></a>
                    <br />
                    <img src={this.props.user.img} alt="dog" style={{ height: '400px', width: '400px' }} />
                    <br />

                    <Link to='/motion-styled-comp'><button>Transitions</button></Link>
                    <MotionStyledComp name="name" />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        restaurantSearch: state.restaurantSearch,
        restaurantList: state.restaurantList,
    };
}

export default connect(mapStateToProps, { getUserInfo, updateRestaurantSearch, updateRestaurantList })(Dashboard);