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

    favoriteList() {
        // console.log("this.props", this.props)
        if (this.props.user.auth_id && this.state.flip) {
            // console.log('has auth_id', this.props)
            axios.get('/savedLists', this.props.user.id)
                .then((res) => {
                    // console.log('res', res)
                    // this.setState({
                    //     favoriteRestaurants: [...res.data]
                    // })
                    this.props.updateFavoriteRestaurants(res.data)
                    this.setState({
                        flip: false
                    });
                })
        } else {
            // console.log('no auth_id yet')
        }

    }

    render() {
        // this.favoriteList();
        return (
            <div style={{ backgroundColor: '#F64548' }}>
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
                    <div>
                        <div>

                            <h3 style={{ letterSpacing: '2px' }}>
                                {this.props.user.display_name}
                            </h3>
                        </div>
                        <p>
                            Favorite Quotes
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
                    {this.favoriteList()}
                    {this.props.favoriteRestaurants.map((val, i) => {
                        return <ProfileButton index={i} listName={val.list_name} key={i} history={this.props.history} authID={this.props.user.auth_id} />
                    })}
                    <a href="/auth/logout"><button>LogOut</button></a>

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