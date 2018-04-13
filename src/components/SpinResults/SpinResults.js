import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantDisplay from './../RestaurantDisplay/RestaurantDisplay';
import axios from 'axios';
import { deleteRestaurantFromList } from './../../ducks/reducer';


class SpinResults extends Component {
    constructor() {
        super()
        this.state = {
            img: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSave() {
        console.log('this.props', this.props)
        // console.log('this.props.currentLocation', this.props.currentLocation)
        // console.log('this.props.user_id', this.props.user.auth_id)
        axios.get(`/favoriteLists/${this.props.currentLocation}/${this.props.user.auth_id}`)
            .then(results => {
                console.log('results.data.length', results.data.length)
                if (results.data.length != 0) {
                    console.log('duplicate', results)
                    alert('duplicate')
                } else {
                    axios.post('/favoriteLists', { currentLocation: this.props.currentLocation })
                        .then((res) => {
                            axios.post(`/savedLists/${this.props.currentLocation}/${res.data[0].id}`, this.props)
                                .then((res) => {
                                    alert('saved ', res)
                                })
                        })
                }
            })



    }

    handleDelete(index) {
        let newList = this.props.restaurantList.splice(index, 1);
        return deleteRestaurantFromList(newList)
    }
    // componentDidUpdate(prevProps) {
    //     console.log('this.props.restaurantList', this.props.restaurantList)
    //     console.log('prev props', prevProps.restaurantList)
    // }

    createRestaurantList(restaurantList) {
        // console.log('yep')
        // console.log('this.props', this.props)
        // console.log('this.props.restaurantList', this.props.restaurantList)
        return restaurantList.map((val, i) => {
            // console.log('val spinresults', val)
            if (val.opening_hours) {
                if (val.opening_hours.open_now) {
                    // console.log('val.photos', val)
                    return (
                        <RestaurantDisplay name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} key={i} index={i} handleDelete={this.handleDelete} />
                    )
                }
            }
        })
    }

    render() {
        // console.log('this.props.restaurantList', this.props.restaurantList)
        console.log('this.props in render', this.props)

        return (
            <div>
                <Nav />
                Spin Results

                {this.createRestaurantList(this.props.restaurantList)}

                <Link to='/dashboard'><button>Dashboard</button></Link>
                <Link to='/restaurant-page'><button>Restaurant</button></Link>
                <Link to='/runner-up'><button>Runner Ups</button></Link>
                <Link to='/google-directions'><button>Directions</button></Link>
                <button className="save-restaurant-button" onClick={() => this.handleSave()}>Save Search</button>
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

export default connect(mapStateToProps, { deleteRestaurantFromList })(SpinResults);