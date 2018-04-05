import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';

function FriendsList(props) {
    // console.log(this.props)
    return(
        <div>
            <Nav />
            FriendsList
            <br/>
            {props.friends.map((val, i) => {
                return(
                    <div key={i}>
                        <h2>{val.name}</h2>
                        <img src={val.img} alt="tommy" height="100px" width="100px"/>
                    </div>
                )
            })}
            <br/>
            <Link to='/dashboard'><button>Dashboard</button></Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        friends: state.friends
    };
}

export default connect(mapStateToProps)(FriendsList);