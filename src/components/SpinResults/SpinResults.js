import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantDisplay from './../RestaurantDisplay/RestaurantDisplay';
import axios from 'axios';
import { updateRestaurantList, deleteRestaurantFromList } from './../../ducks/reducer';


class SpinResults extends Component {
    constructor(props) {
        super(props)
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
        let oldList = [...this.props.restaurantList];
        console.log('oldList', oldList)
        
        let slicedItem = oldList.splice(index, 1);
        console.log('slicedItem', slicedItem)
        console.log('oldList again', oldList)
        deleteRestaurantFromList(oldList)
        console.log('success?')
        console.log('this.props.restaurantList', this.props.restaurantList)
    }
    // componentDidUpdate(prevProps) {
    //     console.log('this.props.restaurantList', this.props.restaurantList)
    //     console.log('prev props', prevProps.restaurantList)
    // }

    createRestaurantList(restaurantList) {
        // console.log('this.props.restaurantList', this.props.restaurantList)
        return restaurantList.map((val, i) => {
            return (
                <div key={i}>
                    <RestaurantDisplay name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} />
                    <button onClick={() => this.handleDelete(i)}>Delete</button>
                </div>
            )
        })
    }


    render() {
        // console.log('this.props.restaurantList', this.props.restaurantList)
        console.log('this.props in render', this.props)
        return (
            <div>
                <Nav />
                Spin Results

                        {this.props.restaurantList.map((val, i) => {
                    return (
                        <div key={i}>
                            <RestaurantDisplay name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} />
                            <button onClick={() => this.handleDelete(i)}>Delete</button>
                        </div>
                    )
                })
                }

                <Link to='/dashboard'><button>Dashboard</button></Link>
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

export default connect(mapStateToProps, { updateRestaurantList, deleteRestaurantFromList })(SpinResults);