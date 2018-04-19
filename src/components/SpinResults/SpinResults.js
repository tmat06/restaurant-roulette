import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantDisplay from './../RestaurantDisplay/RestaurantDisplay';
import axios from 'axios';
import { updateRestaurantList, deleteRestaurantFromList } from './../../ducks/reducer';
import FlatButton from 'material-ui/FlatButton';



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
                                    alert('saved ', res)
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
                <div key={i} style={{width: '100%'}}>
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
                        <div className='spinResultsNavButton'>
                            <Link to='/dashboard'><FlatButton label='Change Search' className='spinResultsNavButton' labelStyle={{ fontSize: '25px' }} /></Link>
                        </div>

                        <div className='spinResultsNavButton'>
                            <Link to='/google-directions'><FlatButton label='Map' className='spinResultsNavButton' labelStyle={{ fontSize: '25px' }} /></Link>
                        </div>

                        <div className='spinResultsNavButton'>
                            <FlatButton label='Save This Search' className='spinResultsNavButton' labelStyle={{ fontSize: '25px' }} onClick={() => this.handleSave()} />
                        </div>

                    </div>

                    <div className='spinResultsContainer'>
                        {this.props.restaurantList.map((val, i) => {
                            return (
                                <div key={i} style={{width: '100%'}}>
                                    <RestaurantDisplay restaurantAddress={val.vicinity} handleDelete={this.handleDelete} index={i} name={val.name} photoRef={val.photos ? val.photos[0] : ""} rating={val.rating} openingHours={val.opening_hours ? val.opening_hours.open_now : false} />
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className='spinResultsNavButton' style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '89.5vh', width: '100%', height: '90px', backgroundColor: '#FFE49F', padding: '5px 0'}}>
                        <Link to='/runner-up'><FlatButton className='spinResultsNavButton' label='Let Fate Decide' fullWidth={true} labelStyle={{ fontSize: '60px' }} style={{ boxShadow: '1px 1px 1px black', backgroundColor: '#F64548', borderRadius: '25px', height: '80px', color: '#FFE49F', textShadow: '1px 1px 2px black'}} /></Link>
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
    };
}

export default connect(mapStateToProps, { updateRestaurantList, deleteRestaurantFromList })(SpinResults);