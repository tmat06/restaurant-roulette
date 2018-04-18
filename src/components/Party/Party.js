import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io();

class Party extends Component{
    constructor(){
        super()
        this.state = {
            party: [],
            messages: ['hello', 'hi there'],
            newMessage: ''
        }
        socket.on('generate response', (data) => {
            const messages = [...this.state.messages, data];
            this.setState({messages})
        })
    }

    handleChange(e){
        this.setState({ newMessage: e.target.value })
    }

    sendMessage(message){
        socket.emit('blast message', message);
    }

    render(){
        const messages = this.state.messages.map((e,i) => <p key={i}>{e}</p>)
        return(
            <div>
                Party Baby!
                <Link to='/friends-list'><button>Invite Friends</button></Link>
                <div>
                    <label>New Message</label>
                    <input type='text' value = {this.state.newMessage} onChange={(e) => {this.handleChange(e)}} />
                    <button onClick={() => {this.sendMessage(this.state.newMessage)}}>Emit</button>
                </div>
                {messages}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        restaurantSearch: state.restaurantSearch,
        restaurantList: state.restaurantList,
        currentLocation: state.currentLocation,
    };
}

export default connect(mapStateToProps)(Party);