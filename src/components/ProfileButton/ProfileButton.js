import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateRestaurantList } from './../../ducks/reducer';

class ProfileButton extends Component {
    constructor() {
        super()
        this.state = {
            newName: ""
        }
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

        return (
            <div key={this.props.index}>
                <button onClick={() => this.updateRedux(this.props)}>{this.props.listName}</button>
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

export default connect(mapStateToProps, {updateRestaurantList})(ProfileButton);