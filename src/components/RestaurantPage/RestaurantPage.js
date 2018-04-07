import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

export default class RestaurantPage extends Component{
    constructor(){
        super()
        this.state = {

        }
    }



    render(){
        return(
            <div>
                <Nav />
                RestaurantPage
                <Link to='/spin-results'><button>Spin Results</button></Link>
                <Link to='/google-directions'><button>Google Directions</button></Link>
            </div>
        )
    }
}