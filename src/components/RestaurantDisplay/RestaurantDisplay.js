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
            return (
                <div className='restaurantDisplayList'>
                <div className='restaurantName'>

                    {this.props.name}
                </div>
                    <Link to='/restaurant-page'><button>RestaurantPage</button></Link>
                    <br />
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photoRef.photo_reference}&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`} alt="restaurant pic" height="300" width="300"/>
                    <br />
                    <p>Rating: {this.props.rating}</p>
                </div>
            )

        } else {
            return (
                <div>
                    {this.props.name}
                    <br />
                    <img src={'https://i.imgflip.com/1c6w3u.jpg'} alt='old guy shrugging' />
                    <br />
                    <p>Rating: N/A</p>
                </div>
            )
        }
    }

    render() {
        // console.log('props', this.props)
        return (
            <div>
                {this.imgDisplay()}
            </div>
        )
    }
}