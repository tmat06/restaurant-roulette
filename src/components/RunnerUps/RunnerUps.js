import React, { Component } from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import RestaurantPage from './../RestaurantPage/RestaurantPage';

class RunnerUps extends Component {
    constructor() {
        super()
        this.state = {
            open: null,
            list: [],
            list1: [
                { name: 'Four Seasons Hot Pot & Dumplings' },
                { name: 'Four Seasons Hot Pot & Dumplings' },
                { name: 'Great China Restaurant' },
                { name: 'Wild Ginger' },
                { name: 'McDonalds' },
                { name: 'joe' },
            ]
        }
    }
    // let list1 = [
    //     { name: 'joe' },
    //     { name: 'joe' },
    //     { name: 'joe' },
    //     { name: 'joe' },
    //     { name: 'joe' },
    //     { name: 'joe' },

    // ]


    // spin(rouletteList) {
    //     // console.log('props', props.rouletteList)
    //     if (props.rouletteList === 'NO RESTAURANTS ARE NEARBY :(') {
    //         return (
    //             <div>Need Restaurants Before We Can Roulette</div>
    //         )
    //     } else {
    //         return <div style={{ height: '100vh', width: '100%', backgroundColor: 'yellow', display: 'flex', flexDirection: 'column' }}>

    //             <Transition
    //                 className='restaurantTitle'
    //                 component="div"
    //                 enter={{
    //                     opacity: 1,
    //                     translateX: spring(0, { stiffness: 90, damping: 3.5 })
    //                 }}
    //                 leave={{
    //                     opacity: 0,
    //                     translateX: -700
    //                 }}
    //             >
    //                 {rouletteList.map((val, i) => {
    //                     console.log('val.name', val.name)
    //                     return (
    //                         <div key={1} style={{ height: '100vh', width: '100%', backgroundColor: 'yellow', display: 'flex', flexDirection: 'column' }} >{val.name}</div>
    //                     )
    //                 })}
    //             </Transition>
    //         </div>
    //     }
    //     // console.log('i', rouletteList)
    // }


    componentDidMount() {
        var list = [];
        let randomSpot = 0;
        for (let i = 0; i < this.props.currentList.length; i++) {
            list[i] = "";
        }

        for (var i = 0; i < this.props.currentList.length; i++) { //randomizes the list
            randomSpot = Math.floor(Math.random() * this.props.currentList.length);
            while (list[randomSpot]) {
                randomSpot = Math.floor(Math.random() * this.props.currentList.length);
            }
            var inputStudent = this.props.currentList[i];
            list[randomSpot] = inputStudent;
        }
        this.setState({
            list: [...list]
        })
    }


    // let rouletteList = [...list]; //adds multiple restaurants to list for spin
    // let j = rouletteList.length;
    // for (let i = 0; i < (j - 40); i++) {
    //     if (list.length - 1 === j) {
    //         j = 0;
    //     }
    //     j++;
    //     console.log('list[j]', list[j])
    //     rouletteList.push(list[j])
    //     console.log('rouletteList', rouletteList)
    // }


    handleOpen(i) {
        this.setState({
            open: i
        })
    }

    // console.log('rouletteList', rouletteList)

    render() {



        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={() => this.handleOpen(false)}
            />
        ];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F64548' }}>
                <Nav />
                <div style={{ marginTop: '50px' }}>
                    <Link to='/spin-results'><FlatButton label='Back to List' fullWidth={true} labelStyle={{ fontSize: '30px' }} className='backToList' style={{ height: '80px', width: '100%', backgroundColor: '#F64548', boxShadow: '1px 1px 1px black', fontFamily: 'Luckiest Guy, cursive', color: '#FFE49F', textShadow: '1px 1px 1px black' }} /></Link>

                </div>
                {this.state.list.map((val, i) => { //change list1 to list
                    // console.log('val', val)
                    if (i === 0) {
                        return (
                            <Transition
                                className='restaurantTitle'
                                component="div"
                                enter={{
                                    opacity: 1,
                                    translateX: spring(0, { stiffness: 70, damping: 10 + i })
                                }}
                                leave={{
                                    opacity: 0,
                                    translateX: -700
                                }}
                            >
                                <Paper
                                    className='paperClass'
                                    style={{backgroundColor: '#FFE49F'}}
                                    zDepth={5}
                                    key={i}>

                                    <div></div>

                                    <div className='winnerBoxBlock'>
                                        <div className='winnerTitle' >Winner!!!</div>
                                        <div className='winnerRestaurant'>{val.name}</div>
                                    </div>

                                    <div >
                                        <div className='winnerBoxBlock' >
                                            <div style={{ width: '300px' }}>

                                                <FlatButton label='Info' fullWidth={true} style={{ backgroundColor: '#FFA880', fontFamily: 'Luckiest Guy, cursive', color: '#F64548', height: '60px', width: '100%' }} onClick={() => this.handleOpen(i)} />
                                                <Dialog
                                                    titleStyle={{ fontFamily: 'Luckiest Guy, cursive' }}
                                                    title={val.name}
                                                    actions={actions}
                                                    modal={false}
                                                    open={this.state.open === i}
                                                    onRequestClose={() => this.handleOpen(null)}
                                                >
                                                    <RestaurantPage name={val.name} style={{ fontFamily: 'Luckiest Guy, cursive' }} openingHours={val.openingHours ? val.openingHours : ''} rating={val.rating} address={val.vicinity} />
                                                </Dialog>


                                                {/* <Link to='/restaurant-page'><FlatButton label='Info' fullWidth={true} style={{ backgroundColor: '#FFA880', fontFamily: 'Luckiest Guy, cursive', color: '#F64548', height: '60px', width: '100%' }} /></Link> */}

                                            </div>
                                            <div style={{ width: '300px' }}>

                                                <Link to='/google-directions'><FlatButton label='Map' fullWidth={false} style={{ backgroundColor: '#FFA880', fontFamily: 'Luckiest Guy, cursive', color: '#F64548', height: '60px', width: '100%' }} /></Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div></div>
                                </Paper>
                            </Transition>
                        )
                    } else {
                        if (i > 5) {
                        } else {
                            return (
                                <Transition
                                    className='restaurantTitle'
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                    component="div"
                                    enter={{
                                        opacity: 1,
                                        translateX: spring(0, { stiffness: 30, damping: 10 + i })
                                    }}
                                    leave={{
                                        opacity: 0,
                                        translateX: -700
                                    }}
                                >
                                    <Paper
                                        key={i}
                                        className='runnerUpBox'
                                        style={{backgroundColor: '#FFE49F'}}
                                        zDepth={1}
                                    >
                                        <div style={{ textAlign: 'left', padding: '5px', borderRadius: '25px', backgroundColor: '#F64548', color: '#FFE49F', fontFamily: 'Luckiest Guy, cursive' }} >{i + 1}. </div>
                                        <div className='runnerUpStyle'>{val.name}</div>
                                        <div>

                                            <FlatButton label='Info' fullWidth={true} style={{ backgroundColor: '#FFA880', fontFamily: 'Luckiest Guy, cursive', color: '#F64548', height: '60px', width: '100%' }} onClick={() => this.handleOpen(i)} />
                                            <Dialog
                                                titleStyle={{ fontFamily: 'Luckiest Guy, cursive' }}
                                                title={val.name}
                                                actions={actions}
                                                modal={false}
                                                open={this.state.open === i}
                                                onRequestClose={() => this.handleOpen(null)}
                                            >
                                                <RestaurantPage name={val.name} style={{ fontFamily: 'Luckiest Guy, cursive' }} openingHours={val.openingHours ? val.openingHours : ''} rating={val.rating} address={val.vicinity} />
                                            </Dialog>
                                            {/* <Link to='/restaurant-page'><FlatButton label='Info' fullWidth={false} style={{ backgroundColor: '#FFA880', fontFamily: 'Luckiest Guy, cursive', color: '#F64548', height: '60px' }} /></Link> */}
                                        </div>
                                    </Paper>
                                </Transition>
                            )
                        }
                    }
                })
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        restaurantSearch: state.restaurantSearch,
        restaurantList: state.restaurantList,
        currentList: state.restaurantList
    }
}

export default connect(mapStateToProps)(RunnerUps);






                // {/* {list.map((val, i) => {
                //     if (!val || val.name === 'NO RESTAURANTS ARE NEARBY :(') {
                //         return (
                //             <div>Need Restaurants Before We Can Roulette</div>
                //         )
                //     }
                //     if (i === 0) {
                //         return (
                //             <div>
                //                 <div>Winner!!!!!</div>
                //                 <Transition
                //                     component="div"
                //                     enter={{
                //                         opacity: 1,
                //                         translateX: spring(0, { stiffness: 90, damping: 3.5 })
                //                     }}
                //                     leave={{
                //                         opacity: 0,
                //                         translateX: -700
                //                     }}
                //                 >
                //                         return (
                //                             <div key={i} >
                //                                 {val.name}
                //                             </div>
                //                         )

                //                 </Transition>
                //                 <button>Restaurant Info</button>
                //                 <button>Directions</button>
                //             </div>

                //         )
                //     } else {
                //         return (



                //             <div>
                //                 <div>Winner!!!!!</div>
                //                 <Transition
                //                     component="div"
                //                     enter={{
                //                         opacity: 1,
                //                         translateX: spring(0, { stiffness: 90, damping: 3.5 })
                //                     }}
                //                     leave={{
                //                         opacity: 0,
                //                         translateX: -700
                //                     }}
                //                 >
                //                         return (
                //                             <div key={i} style={{ color: 'red' }} >
                //                                 {val.name}
                //                             </div>
                //                         )

                //                 </Transition>
                //                 <button>Restaurant Info</button>
                //                 <button>Directions</button>
                //             </div>

                //         )

                //     }
                // })} */}

                // <div className='loginMenu'>

                //     <Transition
                //         className='restaurantTitle'
                //         component="div"
                //         enter={{
                //             opacity: 1,
                //             translateX: spring(0, { stiffness: 50, damping: 6.5 })
                //         }}
                //         leave={{
                //             opacity: 0,
                //             translateX: -700
                //         }}
                //     >
                //         <div className='loginButton'>
                //                 <div name="LOGIN" ></div>
                //         </div>
                //     </Transition>

                // </div>




                // {/* {spin(list)} */}