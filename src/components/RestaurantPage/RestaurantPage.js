import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

export default class RestaurantPage extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    openHours() {
        if (this.props.openingHours) {
            return (
                <div>
                    Open: Yes
        </div>
            )
        } else {
            return (
                <div>
                    Open: No
        </div>
            )
        }
    }



    render() {
        console.log('this.props restaurantPge yo', this.props)
        return (
            <div className="restaurantPopUp">
                <div>
                    {this.props.address}
                </div>
                <div>
                    {this.openHours()}
                </div>
                <div>
                    {this.props.rating}
                </div>

            </div>
        )
    }
}