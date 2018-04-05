import React from 'react';
import Face from 'material-ui/svg-icons/action/face';
import MainButton from './../MainButton/MainButton';
// import Anime from 'react-anime';

export default function Auth(props) {

    return (
        <div className='auth'>
            <div className='authHeader'>
                <div></div>
                <div></div>
                <div className='signUpButton'>
                </div>
            </div>
            <div className='loginMenu'>
                <div></div>
                <div className='title'><strong>Restaurant Roulette</strong></div>
                <a href={process.env.REACT_APP_LOGIN}>
                    <MainButton name="LOGIN" icon={<Face />} wholeWidth={false} />
                </a>
            </div>
            <div>
            </div>
        </div>
    )
}