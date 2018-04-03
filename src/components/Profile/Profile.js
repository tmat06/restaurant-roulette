import React, {Component} from 'react';

export default class Profile extends Component{
    constructor(){
        super();
        this.state = {
            name: ''
        }
    }
    render(){
        return(
            <div>
                Profile Baby
            </div>
        )
    }
}