import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';

class FriendsList extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }
    // console.log(this.props)

    componentDidMount() {
        axios.get('/userList/')
            .then(users => {
                this.setState({
                    users: users.data
                })
            })
    }

    displayUsers() {
        // console.log('props.friends', props.friends)
        // return props.friends.map((val, i) => {
        // console.log('users.data', users.data)
        return this.state.users.map((val, i) => {
            // console.log('current user id', props.user.auth_id)
            // console.log('val.auth_id', val.auth_id)
            // console.log(val.display_name)
            if (val.auth_id !== this.props.user.auth_id) {
                // console.log('hittin dawg')
                // console.log(val.display_name)
                console.log(val.img)

                return (
                    <div key={i} className='friendsBox'>
                        <h2>{val.display_name}</h2>
                        <div className='friendPic'>
                            <img src={val.img} alt="tommy" height="100px" width="100px" />
                            <button>Add To Chat</button>
                        </div>
                    </div>
                )
            }
        })
    }

    render() {

        return (
            <div style={{ backgroundColor: '#F64548' }}>
                <Nav />
                <Link to='/dashboard'><button>Dashboard</button></Link>

                {this.displayUsers()}

            </div >
        )
    }
}
    

function mapStateToProps(state) {
    return {
        friends: state.friends,
        user: state.user
    };
}

export default connect(mapStateToProps)(FriendsList);