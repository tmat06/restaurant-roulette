import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import RestaurantPage from './../RestaurantPage/RestaurantPage';
import LocalDining from 'material-ui/svg-icons/maps/local-dining';
import Close from 'material-ui/svg-icons/navigation/close';



export default class RestaurantDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: '',

        }
    }

    openRestaurant() {
        if (this.props.openingHours) {
            return (
                <div>
                    Currently Open
                </div>
            )
        } else {
            return (
                <div>
                    Currently Closed
                </div>
            )
        }
    }

    imgDisplay() {
        if (this.props.name !== "NO RESTAURANTS ARE NEARBY :(") {
            if (!this.props.photoRef.photo_reference) {
                return (
                    <div className='restaurantDisplayList'>
                        <div className='restaurantName'>
                            <div style={{ textAlign: 'center', padding: '5px 0', backgroundColor: '#FFA880', borderRadius: '14px 14px 0 0', width: '100%' }}>
                                {this.props.name}
                            </div>
                            <div style={{ textAlign: 'left', padding: '5px', fontSize: '16px' }}>
                                {this.props.restaurantAddress}
                            </div>
                            <div style={{ textAlign: 'left', padding: '5px' }}>
                                {this.openRestaurant()}
                            </div>
                            <div style={{ textAlign: 'left', padding: '5px' }}>









                                <button onClick={() => this.props.handleDelete(this.props.index)}>Delete</button>
                            </div>
                        </div>
                        <div className='restaurantImage'>
                            <img src='https://nationalpostcom.files.wordpress.com/2015/08/trump_fox_news_201508081.jpg' alt="Trump Shrugging" height="300" width="350" />
                        </div>
                        <div style={{ paddingLeft: '5px' }}>
                            <p>Rating: {this.props.rating}</p>
                        </div>
                    </div>
                )
            }
            return (
                <div className='restaurantDisplayList'>
                    <div className='restaurantName'>
                        <div style={{ textAlign: 'center', padding: '5px 0', backgroundColor: '#FFA880', borderRadius: '14px 14px 0 0', width: '100%' }}>
                            {this.props.name}
                        </div>


                        <div className='restaurantListButtons'>


                            <Link to='/restaurant-page'><FlatButton label='Info' icon={<LocalDining/>} labelStyle={{ fontSize: '25px' }} style={{ margin: '2px', backgroundColor: '#F64548', color: '#FFE49F', fontFamily: 'Carter one, cursive', borderRadius: '15px', textShadow: '1px 1px 1px black' }} /></Link>
                            <FlatButton label='Delete' icon={<Close/>} onClick={() => this.props.handleDelete(this.props.index)} labelStyle={{ fontSize: '25px' }} style={{ margin: '2px', backgroundColor: '#F64548', color: '#FFE49F', fontFamily: 'Carter one, cursive', borderRadius: '15px', textShadow: '1px 1px 1px black' }} />

                            {/* <button onClick={() => this.props.handleDelete(this.props.index)}>Delete</button> */}
                        </div>
                    </div>
                    <div className='restaurantImage'>
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photoRef.photo_reference}&key=AIzaSyAwNoy6oxdhhbqwCYXfevpt7-Q908UE4_8`} alt="restaurant pic" className='restaurantImage' />
                    </div>
                    <div className='restaurantImagePaddingLeft'>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='restaurantDisplayList'>
                    <div className='restaurantName'>
                        {this.props.name}
                    </div>
                    <div className='restaurantImage'>

                        <img src={'https://i.imgflip.com/1c6w3u.jpg'} alt='old guy shrugging' height="300" width="350" />
                    </div>
                    <p>Rating: N/A</p>
                </div>
            )
        }
    }

    render(props) {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {this.imgDisplay()}
            </div>
        )
    }
}