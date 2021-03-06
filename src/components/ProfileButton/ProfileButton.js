import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch, updateFavoriteRestaurants } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class ProfileButton extends Component {
    constructor() {
        super()
        this.state = {
            newName: "",
            range: '1000',
            open: false,
            openSavedList: false,
        }
        this.handleEnterSave = this.handleEnterSave.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleEnterSave(listName, authID) {
        // console.log('hittin', listName, authID)
        axios.get(`/getGeometry/${listName}/${authID}`)
            .then(address => { // will return address
                // console.log('address', address.data[0].address)
                this.props.locationSearch(address.data[0].address)
                console.log('geocode')
                geocodeByAddress(address.data[0].address)
                    .then(results => getLatLng(results[0]))
                    .then(latLng => {
                        console.log('Success', latLng)
                        this.props.updateRestaurantSearch(latLng);
                        // console.log('range', this.state.range)
                        axios.get(`/googlePlacesSearch/${latLng.lat}/${latLng.lng}/${this.state.range}`)

                            // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&radius=${this.state.range}&type=restaurant&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
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
            })
    }

    deleteFavoriteRestaurant(listName) {
        // console.log('bingo banjo', listName)
        axios.delete(`/savedLists/${listName}`)
            .then(res => {
                // console.log(this.props)
                axios.get('/savedLists', this.props.user.id)
                    .then((res) => {
                        // console.log('res', res)
                        // this.setState({
                        //     favoriteRestaurants: [...res.data]
                        // })
                        this.props.updateFavoriteRestaurants(res.data)
                    }
                    )
            }
            )
    }


    handleUpdate(e) {
        this.setState({
            newName: e.target.value
        })
    }

    handleDistance(e) {
        this.setState({
            range: e.target.value
        })
    }

    updateName(props) {
        axios.put(`/savedLists/${props.listName}/${props.authID}/${this.state.newName}`)
            .then(res => {

                axios.get(`/getNewRestaurantList/${this.state.newName}/${props.authID}`)
                    .then((res) => {//returning ID for favorites
                        axios.put(`/updateFavorites/${res.data[0].saved_id}/${this.state.newName}`)


                        axios.get('/savedLists', this.props.user.id)
                            .then((res) => {
                                // console.log('res', res)
                                // this.setState({
                                //     favoriteRestaurants: [...res.data]
                                // })
                                this.props.updateFavoriteRestaurants(res.data)
                                this.setState({
                                    newName: ''
                                })
                                this.handleToggle();
                            })
                    })
            })
    }

    updateRedux(props) {
        axios.get(`/retrieveList/${props.listName}/${props.authID}`)
            .then(res => {
                this.props.updateRestaurantList(res.data)
            })

    }

    handleToggle() {
        this.setState({ open: !this.state.open })
    }
    handleOpen() {
        this.setState({ openSavedList: !this.state.openSavedList })
    }

    render() {
        // console.log('this.props in profilebutton', this.props)
        const actions = [
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Write New Nickname" aria-label="Write New Nickname" aria-describedby="basic-addon2" onChange={(e) => this.handleUpdate(e)} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => this.updateName(this.props)}>Change Name</button>
                </div>
            </div>,
            <button onClick={() => this.handleToggle()}>close</button>
        ]
        const actions2 = [
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Give a Distance" aria-label="Give a Distance" aria-describedby="basic-addon2" onChange={(e) => this.handleDistance(e)} />
                <div className="input-group-append">

                    <Link to='/spin-results' style={{ textDecoration: 'none' }}><button className="btn btn-outline-secondary" type="button" onClick={() => this.handleEnterSave(this.props.listName, this.props.authID)} >Load Results</button></Link>
                </div>
            </div>,
            <button onClick={() => this.handleOpen()}>cancel</button>
        ]
        // console.log('this.props in profileButton', this.props)
        // console.log('this.state.openSavedList', this.state.openSavedList)
        return (
            <div key={this.props.index} className='profileSavedListMenu'>
                <div>
                    <div></div>
                    <FlatButton
                        label={this.props.listName}
                        fullWidth={false}
                        labelStyle={{ fontFamily: 'Carter one, cursive', fontSize: '25px' }}
                        style={{ color: '#F64548', borderRadius: '0', textShadow: '1px 1px 1px black', marginBottom: '3px' }}
                        onClick={() => this.handleOpen()}
                    />

                    <Dialog
                        title="Load Saved List"
                        actions={actions2}
                        modal={false}
                        open={this.state.openSavedList}
                        onRequestClose={this.handleOpen}
                    />
                </div>

                <div>

                    <FlatButton
                        label={"Change Name"}
                        fullWidth={true}
                        onClick={() => this.handleToggle()}
                        labelStyle={{ fontSize: '20px' }}
                        style={{
                            color: '#F64548',
                            fontFamily: 'Carter One, cursive',
                            borderRadius: 25,
                            backgroundColor: '#FFE49F',
                            textAlign: 'left',
                            hover: {
                                background: 'blue'
                            }
                        }}

                    />
                    <Dialog
                        title="Change Name"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleToggle}
                    />
                </div>
                <div>
                    <FlatButton
                        label='Delete'
                        style={{
                            color: '#F64548',
                            fontFamily: 'Carter One, cursive',
                            borderRadius: 25,
                            backgroundColor: '#FFE49F',
                            textAlign: 'left'
                        }}
                        labelStyle={{ fontSize: '16px' }}
                        onClick={() => this.deleteFavoriteRestaurant(this.props.listName)} />
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
    }

}

export default connect(mapStateToProps, { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch, updateFavoriteRestaurants })(ProfileButton);