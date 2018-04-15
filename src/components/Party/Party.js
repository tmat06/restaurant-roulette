import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Party extends Component{
    constructor(){
        super()
        this.state = {
            party: []
        }
    }
    render(){
        return(
            <div>
                Party Baby!
                <Link to='/friends-list'><button>Invite Friends</button></Link>
                
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

export default connect(mapStateToProps)(Party);