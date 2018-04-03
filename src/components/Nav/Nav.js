import React from 'react';
import MainButton from './../MainButton/MainButton';

export default function Nav (props) {
    return(
        <div>
            <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} />
            <MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} />
        </div>
    )
}