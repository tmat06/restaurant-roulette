import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class ProfileButton extends Component {
    constructor() {
        super()
        this.state = {
            newName: "",
            range: '500'
        }
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
        console.log('props.listName', listName)
        axios.delete(`/savedLists/${listName}`)
            .then(res => {
                alert('saved restaurant has been deleted')
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
            })
    }

    updateRedux(props){
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
                <Link to='/spin-results'><button onClick={() => this.handleEnterSave(this.props.listName, this.state.range)}>{this.props.listName}</button></Link>
                <input placeholder="distance" onChange={(e) => this.handleDistance(e)} />
                <button onClick={() => this.deleteFavoriteRestaurant(this.props.listName)}>delete?</button>
                <input placeholder="new nickname" onChange={(e) => this.handleUpdate(e)} />
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

export default connect(mapStateToProps, { getUserInfo, updateRestaurantSearch, updateRestaurantList, locationSearch })(ProfileButton);