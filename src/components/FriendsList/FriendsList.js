import React from 'react';
import { Link } from 'react-router-dom';

export default function FriendsList() {
    return(
        <div>
            FriendsList
            <Link to='/dashboard'><button>Dashboard</button></Link>
        </div>
    )
}