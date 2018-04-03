import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';

export default function FriendsList() {
    return(
        <div>
            <Nav />
            FriendsList
            <Link to='/dashboard'><button>Dashboard</button></Link>
        </div>
    )
}