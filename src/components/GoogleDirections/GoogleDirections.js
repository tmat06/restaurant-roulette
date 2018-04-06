import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// const AnyReactComponent = ({ text }) => <div>{ text }</div>;

class GoogleDirections extends Component {

    static defaultProps = {
        zoom: 13
    }
    render() {
        console.log(this.props.center)
        console.log(this.props.zoom)
        return (
            <div>
                <Nav />
                <div className="map-container">
                    <div className='side-map-menu'>
                        <Link to='/spin-results'><button>Spin Results</button></Link>
                    </div>
                    <div className='google-map'>
                        <GoogleMapReact
                            defaultCenter={this.props.restaurantSearch}
                            defaultZoom={this.props.zoom}>
                            {/* <AnyReactComponent
            lat={ 40.7473310 }
            lng={ -73.8517440 }
            text={ "Where's Waldo?" }
          /> */}
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        restaurantSearch: state.restaurantSearch,
        restaurantList: state.restaurantList,
        currentLocation: state.currentLocation,
    }
}

export default connect(mapStateToProps)(GoogleDirections)