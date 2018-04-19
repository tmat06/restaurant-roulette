import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io();

class Party extends Component{
    constructor(props){
        super(props)
        this.state = {
            party: [],
            messages: ['hello', 'hi there'],
            newMessage: '',
            roomName: props.auth_id,
            rooms: []
        }
        socket.on('generate response', (data) => { 
            let newMessage = [...this.state.messages];
            newMessage.push(data.message);
            // const roomArr = [...this.state.rooms];
            // roomArr.map(val => {
            //   if (val.name === data.name) val.messages.push(data.message); //checks if name of chat matches one of the chat rooms user has joined
            //   return val;
            // });
            this.setState({ messages: newMessage, newMessage: '' });
          });
    }

    // joinRoom(name){
    //     const rooms = [...this.state.rooms]; //storing previously joined rooms of user
    //     const newRoom = {name, messages: [], message: ''}; //storing empty room data w/ name in newRoom
    //     rooms.push(newRoom);
    //     socket.emit('room', name);
    //     this.setState({
    //         newRoom: '', rooms
    //     });
    // }

    handleChange(e){
        this.setState({ newMessage: e.target.value })
    }

    sendMessage(roomName, displayName, message){
        socket.emit('blast message', {name: roomName, displayName, message});
        // let newMessage = [...this.state.roomName];
        // newMessage = newMessage.map(room => {
        //     if (room.name === roomName){
        //         room.message = '';
        //     }
        //     return room;
        // })
        // this.setState({ message: '', rooms: newMessage });
    }

    render(){
        console.log('this.props in party', this.props)
        const messages = this.state.messages.map((e,i) => <p key={i}>{e}</p>)
        return(
            <div>
                Party Baby!
                <Link to='/friends-list'><button>Invite Friends</button></Link>
                <div>
                    {/* <button onClick={() => {this.joinRoom('room1')}}>room1</button>
                    <button onClick={() => {this.joinRoom('room2')}}>room2</button> */}
                    <label>New Message</label>
                    <input type='text' value = {this.state.newMessage} onChange={(e) => {this.handleChange(e)}} />
                    <button onClick={() => {this.sendMessage(this.state.name, this.props.display_name, this.state.newMessage)}}>Emit</button>
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