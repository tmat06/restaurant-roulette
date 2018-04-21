import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProfileButton from './../ProfileButton/ProfileButton';
import { updateFavoriteRestaurants } from './../../ducks/reducer';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            favoriteRestaurants: [],
            flip: true,
            open2: false
        }
    }

    componentDidMount(){
        axios.get('/savedLists', this.props.user.id)
        .then((res) => {
            this.props.updateFavoriteRestaurants(res.data)
        })
    }

    // favoriteList() {
    //     // console.log("this.props", this.props)
    //     if (this.props.user.auth_id && this.state.flip) {
    //         // console.log('has auth_id', this.props)
    //         axios.get('/savedLists', this.props.user.id)
    //             .then((res) => {
    //                 // console.log('res', res)
    //                 // this.setState({
    //                 //     favoriteRestaurants: [...res.data]
    //                 // })
    //                 this.props.updateFavoriteRestaurants(res.data)
    //             })
    //     } else {
    //         // console.log('no auth_id yet')
    //     }

    // }

    render() {
        // this.favoriteList();
        // console.log('this.props.favoriteRestaurants in Profile.js', this.props.favoriteRestaurants)
        return (
            <div style={{ backgroundColor: '#F64548', height: '100%' }}>
                <FlatButton
                    style={{
                        color: '#F64548',
                        fontFamily: 'Carter One, cursive',
                        fontSize: 20,
                        backgroundColor: '#FFE49F',
                        margin: '0px',
                        borderRadius: '0',
                    }}
                    label={'Return'}
                    labelStyle={{ fontSize: 20 }}
                    fullWidth={true}
                    icon={<ArrowBack />}
                    onClick={() => this.props.handleToggle(this.props.toggle)}
                />

                <div className='profileImage'>
                    <div style={{ height: '200px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center' }}>
                        <div className='profileTitleBox'>
                            <h3 style={{ letterSpacing: '2px' }}>
                                {this.props.user.display_name}
                            </h3>
                        </div>
                        <p>
                            <a href={process.env.REACT_APP_LOGOUT}><FlatButton label='LogOut' style={{color: '#FFE49F', borderRadius: '15px', textShadow: '1px 1px 1px black'}} labelStyle={{fontSize: '20px', fontFamily: 'Carter one, cursive', backgroundColor: '#F64548'}}/></a>
                        </p>
                    </div>
                    <div>
                        <img src={this.props.user.img} alt="dog" style={{ height: '200px', width: '200px', border: '2px solid black', boxShadow: '1px 1px 2px black' }} className="profilePic" />
                    </div>
                </div>
                <div className='profileSavedList'>
                    Saved Lists
                    </div>
                <div className="profileMenu">

                    {this.props.favoriteRestaurants.map((val, i) => {
                        return <ProfileButton index={i} listName={val.list_name} key={i} history={this.props.history} fullWidth={false} authID={this.props.user.auth_id} />
                    })}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        favoriteRestaurants: state.favoriteRestaurants
    };
}

export default connect(mapStateToProps, { updateFavoriteRestaurants })(Profile)