import React from 'react';
import Face from 'material-ui/svg-icons/action/face';
import MainButton from './../MainButton/MainButton';
import Anime from 'react-anime';

export default function Auth() {
    return (
        <div className='auth'>
            <div className='authHeader'>
                <div></div>
                <div></div>
                <div className='signUpButton'>
                    <MainButton name="Sign Up" icon={<Face />} wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} />
                </div>
            </div>
            <div className='loginMenu'>
                <div></div>
                <div className='title'><strong>Restaurant Roulette</strong></div>
                <MainButton name="LOGIN" icon={<Face />} wholeWidth={false} onClick={() => {
                    
                }}/>
            </div>
            <div>
            </div>
        </div>
    )
}