import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProfileButton from './../ProfileButton/ProfileButton';
import { updateFavoriteRestaurants } from './../../ducks/reducer';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            favoriteRestaurants: [],
            flip: true
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
        } else{
            // console.log('no auth_id yet')
        }

    }

    render() {
        // console.log('this.props in render', this.props)
        // this.favoriteList();
        return (
            <div>
                Profile Baby
                <br />
                <a href="/auth/logout"><button>LogOut</button></a>
                
                <img src={this.props.user.img} alt="dog" style={{ height: '200px', width: '200px' }} className="profilePic" />
                
                {this.favoriteList()}
                {this.props.favoriteRestaurants.map((val, i) => {
                    return <ProfileButton index={i} listName={val.list_name} key={i} authID={this.props.user.auth_id} />
                })}
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