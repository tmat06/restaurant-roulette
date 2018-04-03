import React, {Component} from 'react';
import Nav from './../Nav/Nav';

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
                <Nav />
                Profile Baby
            </div>
        )
    }
}