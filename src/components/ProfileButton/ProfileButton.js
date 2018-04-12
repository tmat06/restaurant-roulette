import React, { Component } from 'react';
import axios from 'axios';

export default class ProfileButton extends Component {
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


    handleUpdate(e){
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

    render() {

        return (
            <div key={this.props.index}>
                <button>{this.props.listName}</button>
                <button onClick={() => this.deleteFavoriteRestaurant(this.props.listName)}>delete?</button>
                <input placeholder="new nickname" onChange={(e) => this.handleUpdate(e)}/>
                <button onClick={() => this.updateName(this.props)}>change name</button>
            </div>
        )

    }
}