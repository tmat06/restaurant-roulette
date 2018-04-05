import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class SpinResults extends Component {
    render() {
        return (
            <div>
                <Nav />
                Spin REsults
                {this.props.restaurantList.map((val, i) => {
                    if (val.opening_hours) {
                        if (val.opening_hours.open_now) {
                            return (
                                <div key={i}>
                                    <p>{val.name}</p>
                                </div>
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