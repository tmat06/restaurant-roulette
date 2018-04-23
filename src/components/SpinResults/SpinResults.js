import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantDisplay from './../RestaurantDisplay/RestaurantDisplay';
import axios from 'axios';
import { updateRestaurantList, deleteRestaurantFromList, updateFavoriteRestaurants } from './../../ducks/reducer';
import FlatButton from 'material-ui/FlatButton';
import Shuffle from 'material-ui/svg-icons/av/shuffle';



class SpinResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSave() {
        // console.log('this.props', this.props)
        // console.log('this.props.currentLocation', this.props.currentLocation)
        // console.log('this.props.user_id', this.props.user.auth_id)
        axios.get(`/favoriteLists/${this.props.currentLocation}/${this.props.user.auth_id}`)
            .then(results => {
                if (results.data.length != 0) {
                    alert('duplicate')
                } else {
                    axios.post('/favoriteLists', { currentLocation: this.props.currentLocation })
                        .then((res) => {
                            axios.post(`/savedLists/${this.props.currentLocation}/${res.data[0].id}`, this.props)
                                .then((res) => {
                                    axios.get('/savedLists', this.props.user.id)
                                        .then((res) => {
                                            this.props.updateFavoriteRestaurants(res.data)
                                        })
                                    // axios.get('/')
                                    // this.props.updateFavoriteRestaurants(this.props.user.auth_id)
                                })
                        })
                }
            })



    }

    handleDelete(index) {
        let oldList = [...this.props.restaurantList];
        // console.log('oldList', oldList[index])

        let slicedItem = oldList.splice(index, 1);
        // console.log('slicedItem', slicedItem)
        // console.log('oldList again', oldList)
        this.props.deleteRestaurantFromList(oldList)
        // console.log('success?')
        // console.log('this.props.restaurantList', this.props.restaurantList)
    }
    // componentDidUpdate(prevProps) {
    //     console.log('this.props.restaurantList', this.props.restaurantList)
    //     console.log('prev props', prevProps.restaurantList)
    // }

    createRestaurantList(restaurantList) {
        // console.log('this.props.restaurantList', this.props.restaurantList)
        return restaurantList.map((val, i) => {
            return (
                <div key={i} style={{ width: '100%' }}>
                    <RestaurantDisplay name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} />
                </div>
            )
        })
    }



    render() {
        // console.log('this.props.restaurantList', this.props.restaurantList)
        // console.log('this.props in render', this.props)
        return (
            <div>
                <Nav />
                <div className='spinResults'>
                    <div className='nav-down'>
                        <div>
                            <Link to='/dashboard'><FlatButton label='Search Again' className='spinResultsNavButton' labelStyle={{ fontSize: '25px', color: '#FFE49F', textShadow: '1px 1px 1px black' }} /></Link>
                        </div>

                        <div>
                            <Link to='/google-directions'><FlatButton label='Map' className='spinResultsNavButton' labelStyle={{ fontSize: '25px', color: '#FFE49F', textShadow: '1px 1px 1px black' }} /></Link>
                        </div>

                        <div>
                            <FlatButton label='Save Search' className='spinResultsNavButton' labelStyle={{ fontSize: '25px', color: '#FFE49F', textShadow: '1px 1px 1px black' }} onClick={() => this.handleSave()} />
                        </div>

                    </div>

                    <div className='spinResultsContainer'>
                        {this.props.restaurantList.map((val, i) => {
                            return (
                                <div key={i} className='restaurantDisplayContainer' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <RestaurantDisplay restaurantAddress={val.vicinity} handleDelete={this.handleDelete} index={i} name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} openingHours={val.opening_hours ? val.opening_hours.open_now : false} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} />
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className='spinResultsNavButton'>
                        <Link to='/runner-up' style={{ width: '100%' }}><FlatButton className='spinResultsNavButton' label='Shuffle' icon={<Shuffle style={{ height: '60px', width: '60px' }} />} fullWidth={true} labelStyle={{ fontSize: '50px' }} style={{ boxShadow: '1px 1px 1px black', backgroundColor: '#F64548', borderRadius: '25px', height: '80px', color: '#FFE49F', textShadow: '1px 1px 2px black' }} /></Link>
                    </div>

                    <div className="spinResultsFooter"></div>
                </div>
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
        favoriteRestaurants: state.favoriteRestaurants
    };
}

export default connect(mapStateToProps, { updateRestaurantList, deleteRestaurantFromList, updateFavoriteRestaurants })(SpinResults);