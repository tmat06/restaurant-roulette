import React from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';

export default function RunnerUps(){
    return(
        <div>
            <Nav />
            RunnerUps
            <Link to='/spin-results'><button>Spin Results</button></Link>
        </div>
    )
}