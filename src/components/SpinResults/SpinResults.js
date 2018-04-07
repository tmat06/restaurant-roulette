import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantDisplay from './../RestaurantDisplay/RestaurantDisplay';


class SpinResults extends Component {
    constructor() {
        super()
        this.state = {
            img: ''
        }
    }



    render() {
        // console.log(this.props.restaurantList)
        // console.log('this.props in render', this.props)

        return (
            <div>
                <Nav />
                Spin Results
                {this.props.restaurantList.map((val, i) => {
                    if (val.opening_hours) {
                        if (val.opening_hours.open_now) {
                            // console.log('val.photos', val)
                            return (
                                <RestaurantDisplay name={val.name} photoRef={val.photos? val.photos[0]:""} rating={val.rating} />
                            )
                        }
                    }
                })}
                <Link to='/dashboard'><button>Dashboard</button></Link>
                <Link to='/restaurant-page'><button>Restaurant</button></Link>
                <Link to='/runner-up'><button>Runner Ups</button></Link>
                <Link to='/google-directions'><button>Directions</button></Link>
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

export default connect(mapStateToProps)(SpinResults);