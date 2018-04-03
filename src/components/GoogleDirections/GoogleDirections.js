import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';

export default function GoogleDirections(){
    return (
        <div>
            <Nav />
            Google Biz Right here
            <Link to='/spin-results'><button>Spin Results</button></Link>
        </div>
    )
}