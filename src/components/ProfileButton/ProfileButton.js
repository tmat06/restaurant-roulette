import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch, updateFavoriteRestaurants } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MainButton from './../MainButton/MainButton';


class ProfileButton extends Component {
    constructor() {
        super()
        this.state = {
            newName: "",
            range: '500'
        }
        this.handleEnterSave = this.handleEnterSave.bind(this);
    }

    handleEnterSave(address, range) {
        console.log('address', address)
        this.props.locationSearch(address)
        console.log('geocode')
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.props.updateRestaurantSearch(latLng);
                axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&radius=${range}&type=restaurant&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
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

    deleteFavoriteRestaurant(listName) {
        console.log('bingo banjo', listName)
        axios.delete(`/savedLists/${listName}`)
            .then(res => {
                alert('saved restaurant has been deleted')
                console.log(this.props)
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
                alert('name has been updated to ' + this.state.newName)
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
                    })
            })
    }

    updateRedux(props) {
        axios.get(`/retrieveList/${props.listName}/${props.authID}`)
            .then(res => {
                this.props.updateRestaurantList(res.data)
                alert('redux updated')
            })

    }

    render() {
        // console.log('this.props in profileButton', this.props)
        return (
            <div key={this.props.index}>
                <Link to='/spin-results' style={{ textDecoration: 'none' }}><MainButton name={this.props.listName} wholeWidth={true} style={{ color: '#F64548' }} handleEnterSave = {this.handleEnterSave} listName={this.props.listName} range={this.state.range} /></Link>

                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">Button</button>
                    </div>
                </div>

                <input placeholder="distance" onChange={(e) => this.handleDistance(e)} />
                <button onClick={() => this.deleteFavoriteRestaurant(this.props.listName)}>delete?</button>
                <input placeholder="new nickname" onChange={(e) => this.handleUpdate(e)} value={this.state.newName} />
                <button onClick={() => this.updateName(this.props)}>change name</button>

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