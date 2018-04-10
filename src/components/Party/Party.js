import React, { Component } from 'react';
import { connect } from 'react-redux';

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