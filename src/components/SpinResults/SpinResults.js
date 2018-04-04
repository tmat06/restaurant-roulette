import React, {Component} from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

export default class SpinResult extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <Nav />
                Spin REsults 
                <Link to='/dashboard'><button>Dashboard</button></Link>               
                <Link to='/restaurant-page'><button>Restaurant</button></Link>               
                <Link to='/runner-up'><button>Runner Ups</button></Link>               
                <Link to='/google-directions'><button>Directions</button></Link>               
            </div>

        )
    }
}