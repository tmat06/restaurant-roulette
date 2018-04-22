import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PersonPin from 'material-ui/svg-icons/maps/person-pin';
import LocalDining from 'material-ui/svg-icons/maps/local-dining';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleDirections extends Component {

    static defaultProps = {
        zoom: 17
    }
    render() {


        return (
            <div>
                <Nav />
                <div style={{ marginTop: '50px' }}>
                    <Link to='/spin-results'><FlatButton label='Back to List' fullWidth={true} labelStyle={{ fontSize: '30px' }} className='backToList' style={{ height: '80px', width: '100%', backgroundColor: '#F64548', boxShadow: '1px 1px 1px black', fontFamily: 'Luckiest Guy, cursive', color: '#FFE49F', textShadow: '1px 1px 1px black' }} /></Link>

                </div>
                <div className="map-container">
                    {/* <div className='side-container'>
                        <Link to='/spin-results'><button>Spin Results</button></Link>
                        <div className='side-map-menu'>
                            {this.props.restaurantList.map((val, i) => {
                                // if (val.opening_hours.open_now) {
                                return <div className='side-map-buttons' key={i}>
                                    {val.name}
                                </div>
                                // }
                            })}

                        </div>
                    </div> */}
                    <div className='google-map' style={{backgroundColor: '#F64548'}}>
                        <GoogleMapReact
                            defaultCenter={this.props.restaurantSearch}
                            defaultZoom={this.props.zoom}>
                            <AnyReactComponent
                                style={{ zIndex: '1' }}
                                lat={this.props.restaurantSearch.lat}
                                lng={this.props.restaurantSearch.lng}
                                text={
                                    <IconButton
                                        style={{ backgroundColor: '#F64548', borderRadius: '25px' }}
                                        iconStyle={{color: '#ffe49f'}}
                                        tooltip={"You're Right Here"}>
                                        <PersonPin />
                                    </IconButton>}
                            />
                            {
                                this.props.restaurantList.map((val, i) => {
                                    // if (val.opening_hours.open_now) {
                                    return <AnyReactComponent
                                        lat={val.geometry.location.lat}
                                        lng={val.geometry.location.lng}
                                        text={<IconButton
                                            iconStyle={{color: '#F64548'}}
                                            style={{ backgroundColor: '#ffe49f', borderRadius: '25px' }}
                                            tooltip={val.name}>
                                            <LocalDining />
                                        </IconButton>}
                                        // text={<FlatButton label={val.name} style={{backgroundColor: '#FFE49F'}} icon={<LocalDining style={{color: '#F64548'}}/>}/>}
                                        key={i}
                                    />
                                    // }

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