import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MotionStyledComp from './../MotionStyledComp/MotionStyledComp';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            address: 'Provo, UT',
            selectField: '500',
            cityOrAddress: '(cities)',
            openOrClosed: true
        }
        this.onChange = (address) => this.setState({
            address
        })
        this.selectField = this.selectField.bind(this);
        this.updateSelect = this.updateSelect.bind(this);
        this.updateCityOrAddress = this.updateCityOrAddress.bind(this);
        this.updateOpenOrClosed = this.updateOpenOrClosed.bind(this);
    }
    componentDidMount() {
        this.props.getUserInfo();
        if (this.props.currentLocation) {
            this.setState({
                address: this.props.currentLocation
            })
        }

    }

    selectField(name) {
        this.setState({
            selectField: name
        })
    }

    handleEnter() {
        console.log('this.state.address', this.state.address)
        this.props.locationSearch(this.state.address)
        console.log('geocode')
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.props.updateRestaurantSearch(latLng);
                axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.restaurantSearch.lat},${this.props.restaurantSearch.lng}&radius=${this.state.selectField}&type=restaurant&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
                    .then((res) => {
                        if (!res.data.results.length) {

                            this.props.updateRestaurantList([{
                                name: "NO RESTAURANTS ARE NEARBY :(",
                                opening_hours: {
                                    open_now: true
                                },
                                geometry: {
                                    location: {
                                        latLng
                                    }
                                }
                            }])
                        } else {
                            if (this.state.openOrClosed) {
                                let newList = []
                                // console.log('hit after axios', res.data.results)
                                res.data.results.map((val, i) => {

                                    // console.log('val', val)
                                    if (val.opening_hours && val.opening_hours.open_now) {
                                        newList.push(val)
                                    }
                                })
                                this.props.updateRestaurantList(newList)
                            } else {
                                this.props.updateRestaurantList(res.data.results)
                            }
                        }
                    })
                this.props.history.push('/spin-results');
            })
            .catch(error => console.log('error', error))

    }

    updateSelect(e, i, value) {
        this.setState({
            selectField: value
        })
    }

    updateCityOrAddress(e, i, value) {
        this.setState({
            cityOrAddress: value
        })
    }

    updateOpenOrClosed(e, i, value) {
        this.setState({
            openOrClosed: value
        })
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
        console.log('this.props', this.props)
        // console.log('this.state.selectField', this.state.selectField)
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
                    <SelectField
                            floatingLabelText="Open or Closed"
                            value={this.state.openOrClosed}
                            onChange={this.updateOpenOrClosed}
                        >
                            <MenuItem value={true} primaryText='Open' />
                            <MenuItem value={false} primaryText='Open Or Closed' />
                        </SelectField>

                        <SelectField
                            floatingLabelText="Distance"
                            value={this.state.selectField}
                            onChange={this.updateSelect}
                        >
                            <MenuItem value={'50'} primaryText='50 m' />
                            <MenuItem value={'100'} primaryText='100 m' />
                            <MenuItem value={'500'} primaryText='500 m' />
                            <MenuItem value={'1000'} primaryText='1000 m' />
                            <MenuItem value={'5000'} primaryText='5000 m' />
                            <MenuItem value={'10000'} primaryText='10000 m' />
                        </SelectField>


                        <SelectField
                            floatingLabelText="City or Address"
                            value={this.state.cityOrAddress}
                            onChange={this.updateCityOrAddress}
                        >
                            <MenuItem value={'(cities)'} primaryText='City' />
                            <MenuItem value={'address'} primaryText='Address' />
                        </SelectField>

                    </div>
                    <div>
                        <PlacesAutocomplete inputProps={inputProps} highlightFirstSuggestion={true} styles={myStyles} options={{ types: [this.state.cityOrAddress] }} onEnterKeyDown={() => this.handleEnter()} />
                    </div>

                    <br />
                    <Link to='/spin-results'><button onClick={() => this.handleEnter()}>SpinResults</button></Link>
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
        currentLocation: state.currentLocation,
    };
}

export default connect(mapStateToProps, { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch })(Dashboard);