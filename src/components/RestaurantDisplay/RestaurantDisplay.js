import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RestaurantDisplay extends Component {
    constructor() {
        super()
        this.state = {
            img: '',
        }
    }

    imgDisplay() {
        if (this.props.name !== "NO RESTAURANTS ARE NEARBY :(") {
            return <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photoRef.photo_reference}&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`} alt="restaurant pic" />
        } else {
            return <img src={'https://i.imgflip.com/1c6w3u.jpg'} alt='old guy shrugging' />
        }
    }

    render() {
        // console.log('props', this.props)
        return (
            <div>
                {this.props.name}
                <Link to='/restaurant-page'><button>RestaurantPage</button></Link>
                <br />
                <button onClick={() => this.props.handleDelete(this.props.index)}>Delete</button>
                <br />
                {this.imgDisplay()}
                <br />
                <p>Rating: {this.props.rating}</p>
            </div>
        )
    }
}