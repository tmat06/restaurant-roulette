import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleDirections extends Component {

    static defaultProps = {
        zoom: 14
    }
    render() {
        console.log(this.props.center)
        console.log(this.props.zoom)
        console.log('restaurants', this.props.restaurantList)

        return (
            <div>
                <Nav />
                <div className="map-container">
                    <div className='side-container'>
                        <Link to='/spin-results'><button>Spin Results</button></Link>
                        <div className='side-map-menu'>
                            {this.props.restaurantList.map((val, i) => {
                                if (val.opening_hours.open_now) {
                                return <div className='side-map-buttons' key={i}>
                                    {val.name}
                                </div>
                                }
                            })}
                        
                        </div>
                    </div>
                    <div className='google-map'>
                        <GoogleMapReact
                            defaultCenter={this.props.restaurantSearch}
                            defaultZoom={this.props.zoom}>
                            <AnyReactComponent
                                lat={this.props.restaurantSearch.lat}
                                lng={this.props.restaurantSearch.lng}
                                text='You are Here'
                            />
                            {
                                this.props.restaurantList.map((val, i) => {
                                    if (val.opening_hours.open_now) {
                                        return <AnyReactComponent
                                            lat={val.geometry.location.lat}
                                            lng={val.geometry.location.lng}
                                            text={val.name}
                                            key={i}
                                        />
                                    }

                                })
                            }
                        </GoogleMapReact>
                    </div>
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
    }
}

export default connect(mapStateToProps)(GoogleDirections)