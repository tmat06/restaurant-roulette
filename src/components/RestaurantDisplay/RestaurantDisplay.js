import React, { Component } from 'react';
import axios from 'axios';

export default class RestaurantDisplay extends Component{
    constructor(){
        super()
        this.state = {
            img: ''
        }
    }

    componentDidMount() {
        console.log('this.props.photoRef.photo_reference', this.props.photoRef.photo_reference)
        let photo =  this.props.photoRef.photo_reference
        console.log(photo)
        axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`)
        .then(results => {
            this.setState({
                img: results.config.url
            })
            // console.log('results', results)
        })
    }

    render(){
        return(
            <div>
                {this.props.name}
                {this.state.img}
            </div>
        )
    }
}
