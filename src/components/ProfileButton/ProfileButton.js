import React from 'react';

export default function ProfileButton(props){
    // console.log(this.props)
    return(
    <div key = {props.index}>
        <button>{props.listName}</button>
    </div>
    )
}