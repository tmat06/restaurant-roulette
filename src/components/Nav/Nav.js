import React from 'react';
import MainButton from './../MainButton/MainButton';
import { Link } from 'react-router-dom';

export default function Nav () {
    return(
        <div>
            <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} />
            <Link to='/profile'><MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} /></Link>
        </div>

    )
}