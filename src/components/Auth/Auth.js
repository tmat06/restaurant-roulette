import React from 'react';
import Face from 'material-ui/svg-icons/action/face';
import MainButton from './../MainButton/MainButton';
import Transition from 'react-motion-ui-pack';
import { Motion, spring } from 'react-motion';
// import Anime from 'react-anime';

export default function Auth(props) {
    let title = ['R', 'e', 's', 't', 'a', 'u', 'r', 'a', 'n', 't']
    let title2 = ['R', 'o', 'u', 'l', 'e', 't', 't', 'e']

    return (
        <div className='auth'>
            <div className='authHeader'>
                <div></div>
                <div></div>
                <div className='signUpButton'></div>
            </div>
            <div className='titleContainer'>


                <div className='title'>


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
                            translateX: spring(0, { stiffness: 50, damping: 6.5 })
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
                        <a href={process.env.REACT_APP_LOGIN}>
                            <MainButton name="LOGIN" icon={<Face />} wholeWidth={false}/>
                        </a>
                    </Transition>
                
                </div>
            </div>
        </div>
    )
}