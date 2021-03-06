import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import MotionStyledComp from './../MotionStyledComp/MotionStyledComp';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import Search from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';




class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            address: 'Provo, UT',
            selectField: '1000',
            cityOrAddress: '(cities)',
            openOrClosed: true,
            spinResultsDisplay: false,
        }
        this.onChange = (address) => this.setState({
            address,
            spinResultsDisplay: true
        })
        this.selectField = this.selectField.bind(this);
        this.updateSelect = this.updateSelect.bind(this);
        this.updateCityOrAddress = this.updateCityOrAddress.bind(this);
        this.updateOpenOrClosed = this.updateOpenOrClosed.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    componentDidMount() {
        this.props.getUserInfo()
            .then(res => {
                this.displayName()
            })
        if (this.props.currentLocation) {
            this.setState({
                address: this.props.currentLocation,
            })
        }
        this.setState({
            openOrClosed: true
        })

    }

    selectField(name) {
        this.setState({
            selectField: name
        })
    }

    displayName() {
        const greeting = 'Welcome ';
        let firstName = this.props.user.display_name.split(' ');
        return (
            <Transition
                component="div"
                enter={{
                    opacity: 1,
                    translateY: spring(0, { stiffness: 80, damping: 28 })
                }}
                leave={{
                    opacity: 0,
                    translateY: -400
                }}
            >
                {
                    <div className='greetingDisplayName' key='0'>
                        {greeting}{firstName[0]}
                    </div>
                }
            </Transition>
        )
    }

    handleEnter() {
        this.props.locationSearch(this.state.address)
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.props.updateRestaurantSearch(latLng);
                axios.get(`/googlePlacesSearch/${latLng.lat}/${latLng.lng}/${this.state.selectField}`)
                // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.restaurantSearch.lat},${this.props.restaurantSearch.lng}&radius=${this.state.selectField}&type=restaurant&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
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
                                        // console.log('val', val)
                                    }
                                })
                                if(!newList.length){
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
                                    this.props.updateRestaurantList(newList)
                                }
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
                width: '80vw',
            },
            input: {
                backgroundColor: '#FFE49F',
                width: '100%',
                fontFamily: 'Carter One, cursive',
                color: '#F64548',
                borderRadius: '25px',
                fontSize: '25px',
                display: 'flex',
                justifyContent: 'center',
                outline: 'none',
                border: 'none',
                boxShadow: '1px 1px 2px #FFA880'
            },
            autocompleteContainer: {
                fontFamily: 'Carter One, cursive',
                width: '80vw',
                borderRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FFA880',

            },
            autocompleteItem: {
                zIndex: '1',
                backgroundColor: '#FFA880',
                color: '#F64548',
                fontFamily: 'Carter One, cursive',
                width: '45vw',
                borderRadius: '25px',
            },
        }
        // console.log('this.props dashboard', this.props)
        // console.log('flip?', this.state.spinResultsDisplay)
        
        // console.log('this.state.selectField', this.state.selectField)
        // console.log('this.props.restaurantSearch', this.props.restaurantSearch)
        // console.log('this.props.restaurantList', this.props.restaurantList)
        return (
            <div>
                <Nav history={this.props.history}/>
                <div >
                    <div className="dashboardContainer">
                    <div></div>
                        <div className='selectFieldsContainer'>
                            <div >
                                {this.displayName()}
                            </div>
                            <h2 className='filterTitle'>Filters</h2>
                            <SelectField
                                labelStyle={{ fontFamily: 'Luckiest Guy, cursive', color: '#F64548', fontSize: '25px', border: '10px', padding: '0px' }}
                                floatingLabelStyle={{ color: '#FFA070', fontFamily: 'Luckiest Guy, cursive', borderRadius: '25px' }}
                                underlineStyle={{ borderColor: 'black' }}
                                iconStyle={{ fill: 'black' }}
                                menuItemStyle={{ backgroundColor: '#FFA070', fontFamily: 'Luckiest Guy, cursive', fontSize: '16px', color: '#F64548', padding: '0px' }}
                                listStyle={{ backgroundColor: '#FFA070' }}
                                selectedMenuItemStyle={{ color: '#FFE49F', textShadow: '.5px .5px 1px #000' }}

                                floatingLabelText="Open or Closed"
                                value={this.state.openOrClosed}
                                onChange={this.updateOpenOrClosed}
                            >
                                <MenuItem value={true} primaryText='Open' />
                                <MenuItem value={false} primaryText='Open Or Closed' />
                            </SelectField>

                            <SelectField
                                labelStyle={{ fontFamily: 'Luckiest Guy, cursive', color: '#F64548', fontSize: '25px', border: '10px', padding: '0px' }}
                                floatingLabelStyle={{ color: '#FFA070', fontFamily: 'Luckiest Guy, cursive', borderRadius: '25px' }}
                                underlineStyle={{ borderColor: 'black' }}
                                iconStyle={{ fill: 'black' }}
                                menuItemStyle={{ backgroundColor: '#FFA070', fontFamily: 'Luckiest Guy, cursive', fontSize: '16px', color: '#F64548', padding: '0px' }}
                                listStyle={{ backgroundColor: '#FFA070' }}
                                selectedMenuItemStyle={{ color: '#FFE49F', textShadow: '.5px .5px 1px #000' }}

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
                                labelStyle={{ fontFamily: 'Luckiest Guy, cursive', color: '#F64548', fontSize: '25px', border: '10px', padding: '0px' }}
                                floatingLabelStyle={{ color: '#FFA070', fontFamily: 'Luckiest Guy, cursive', borderRadius: '25px' }}
                                underlineStyle={{ borderColor: 'black' }}
                                iconStyle={{ fill: 'black' }}
                                menuItemStyle={{ backgroundColor: '#FFA070', fontFamily: 'Luckiest Guy, cursive', fontSize: '16px', color: '#F64548', padding: '0px' }}
                                listStyle={{ backgroundColor: '#FFA070' }}
                                selectedMenuItemStyle={{ color: '#FFE49F', textShadow: '.5px .5px 1px #000' }}

                                floatingLabelText="City or Address"
                                value={this.state.cityOrAddress}
                                onChange={this.updateCityOrAddress}
                            >
                                <MenuItem value={'(cities)'} primaryText='City' />
                                <MenuItem value={'address'} primaryText='Address' />
                            </SelectField>

                        </div>
                        <div className='autoComplete'>
                            <div className='searchHere'>
                                Search Here:
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <PlacesAutocomplete
                                    inputProps={inputProps}
                                    highlightFirstSuggestion={true}
                                    className='autoCompleteSearch'
                                    styles={myStyles}
                                    options={{ types: [this.state.cityOrAddress] }}
                                    onEnterKeyDown={() => this.handleEnter()}
                                />
                            </div>
                        </div>
                        <div>
                            <Link to='/spin-results' style={{textDecoration: 'none'}}><FlatButton label="Search" icon={<Search />} labelStyle={{fontFamily: 'Luckiest Guy, cursive', fontSize: '25px'}} wholeWidth={false} style={{ color: '#F64548', borderRadius: '25px', backgroundColor: '#FFE49F' }} onClick={() => this.handleEnter()}/></Link>
                        </div>
                    </div>
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