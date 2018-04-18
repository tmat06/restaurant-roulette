import React from 'react';
import Nav from './../Nav/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function RunnerUps(props) {


    var currentList = [];
    let randomSpot = 0;

    for (let i = 0; i < props.currentList.length; i++) {
        currentList[i] = "";
    }

    for (var i = 0; i < props.currentList.length; i++) {
        randomSpot = Math.floor(Math.random() * props.currentList.length);
        while (currentList[randomSpot]) {
            randomSpot = Math.floor(Math.random() * props.currentList.length);
        }
        var inputStudent = props.currentList[i];
        currentList[randomSpot] = inputStudent;
    }

    // let rouletteList = [...currentList];
    // for(let i = 0; i < 20; i++){

    // }

    // console.log('rouletteList', rouletteList)
    return (
        <div>
            <Nav />
            <Link to='/spin-results'><button>Modify List</button></Link>
            {/* {currentList.map((val, i) => {
                if (val.name === 'NO RESTAURANTS ARE NEARBY :(') {
                    return (
                        <div>Need Restaurants Before We Can Roulette</div>
                    )
                }
                if (i === 0) {
                    return (
                        <div key={i}>
                            <div>Winner is: {val.name}</div>
                            <button>Restaurant Info</button>
                            <button>Directions</button>
                        </div>
                    )
                } else {
                    return (
                        <div key={i}>
                            {i + 1}. {val.name}
                        </div>
                    )

                }
            })} */}

            {
                props.currentList.map((val, i) => {
                    console.log('hittin')
                if (val.name === 'NO RESTAURANTS ARE NEARBY :(') {
                    return (
                        <div>Need Restaurants Before We Can Roulette</div>
                    )
                } else {
                    // rouletteList.push(val.name);
                }
                // console.log('i', rouletteList)
            }
            )}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentList: state.restaurantList
    }
}

export default connect(mapStateToProps)(RunnerUps);