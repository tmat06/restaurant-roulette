import React from 'react';
import Face from 'material-ui/svg-icons/action/face';
import MainButton from './../MainButton/MainButton';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import setTimeout from 'react-timeout';

function sayHi() {
    return (
        <div>
            dog
        </div>
    )
}

function timedDelay() {
    console.log('hit')
    setTimeout(() => sayHi(), 300);
}




export default function Auth(props) {
    let title = ['R', 'e', 's', 't', 'a', 'u', 'r', 'a', 'n', 't']
    let title2 = ['R', 'o', 'u', 'l', 'e', 't', 't', 'e']
    return (
        <div className='auth'>
            <div className='authHeader'>
                <div></div>
                {timedDelay()}
            </div>
            <div className='titleContainer'>
                <div className='title'>
                    <Transition
                        className='restaurantTitle'
                        component="div"
                        enter={{
                            opacity: 1,
                            translateX: spring(0, { stiffness: 50, damping: 7.5 })
                        }}
                        leave={{
                            opacity: 0,
                            translateX: -700
                        }}
                    >
                        {title.map((val, i) => {
                            return (
                                <div className="restaurant" key={i}>{val}</div>
                            )
                        })}
                    </Transition>
                    <Transition
                        className='restaurantTitle'
                        component="div"
                        enter={{
                            opacity: 1,
                            translateX: spring(0, { stiffness: 50, damping: 7.5 })
                        }}
                        leave={{
                            opacity: 0,
                            translateX: 700
                        }}
                    >
                        {title2.map((val, i) => {
                            return (
                                <div className="restaurant" key={i}>{val}</div>
                            )
                        })}
                    </Transition>
                </div>

                <div className='loginMenu'>

                    <Transition
                        className='restaurantTitle'
                        component="div"
                        enter={{
                            opacity: 1,
                            translateX: spring(0, { stiffness: 50, damping: 6.5 })
                        }}
                        leave={{
                            opacity: 0,
                            translateX: -700
                        }}
                    >
                        <div className='loginButton'>
                            <a href={process.env.REACT_APP_LOGIN}>
                                <MainButton name="LOGIN" icon={<Face />} wholeWidth={false} style={{ color: '#F64548' }} />
                            </a>

                        </div>
                    </Transition>

                </div>
            </div>
        </div>
    )
}