import React from 'react';
import axios from 'axios';

function deleteFavoriteRestaurant(props){
    axios.get('/favoriteLists')
    axios.delete(`/savedLists/${props.index}/${props.listName}`)
}

export default function ProfileButton(props){
    console.log('props in profileButton', props)
    return(
    <div key = {props.index}>
        <button>{props.listName}</button><button onClick={() => deleteFavoriteRestaurant()}>delete?</button>
    </div>
    )
}