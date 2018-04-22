import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';



const socket = io();

class Party extends Component {
    constructor(props) {
        super(props)
        this.state = {
            party: [],
            messages: [{}],
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

    componentDidMount() {
        axios.get('/chatMessage')
            .then(messages => {
                console.log('messages in Party', messages)
                this.setState({
                    messages: [...messages.data]
                })
            })
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }

    sendMessage(roomName, displayName, message) {
        axios.post(`/chatMessage/${displayName}/${message}`)
            .then(results => {
                console.log('posted?')
                axios.get('/chatMessage')
                    .then(messages => {
                        console.log("messages after send", messages.data)
                        this.setState({
                            messages: [...messages.data]
                        })
                    })
            })
        socket.emit('blast message', { name: roomName, displayName, message });
        // let newMessage = [...this.state.roomName];
        // newMessage = newMessage.map(room => {
        //     if (room.name === roomName){
        //         room.message = '';
        //     }
        //     return room;
        // })
        // this.setState({ message: '', rooms: newMessage });
    }

    render() {
        // console.log('this.props in party', this.props)
        console.log(this.state.messages)
        const messages = this.state.messages.map((e, i) => <p key={i}>{e}</p>)
        return (
            <div style={{ height: '100vh', backgroundColor: '#F64548' }}>
                <FlatButton
                    style={{
                        color: '#F64548',
                        fontFamily: 'Carter One, cursive',
                        fontSize: 20,
                        backgroundColor: '#FFE49F',
                        margin: '0px',
                        borderRadius: '0',
                    }}
                    label={'Return'}
                    labelStyle={{ fontSize: 20 }}
                    fullWidth={true}
                    icon={<ArrowBack />}
                    onClick={() => this.props.handleToggle(this.props.toggle)}
                />
                <div>
                    <Link to='/friends-list'><FlatButton label='View Users' fullWidth={true} labelStyle={{fontFamily: 'Luckiest Guy, cursive', fontSize: '25px'}} style={{color: '#FFE49F'}}/></Link>
                </div>


                <div style={{ marginTop: '20px', marginBottom: '20px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse', padding: '50px' }} >
                    {this.state.messages.map((val, i) => {
                        console.log('val', val)
                        return (
                            <div key={i} style={{ display: 'flex' }} >
                                <div>
                                    {val.name}
                                </div>
                                <div>
                                    {val.message}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{ bottom: '0', position: 'fixed', height: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFE49F', borderRadius: '15px' }}>
                    {/* <button onClick={() => {this.joinRoom('room1')}}>room1</button>
                    <button onClick={() => {this.joinRoom('room2')}}>room2</button> */}
                    <input type='text' value={this.state.newMessage} onChange={(e) => { this.handleChange(e) }} />
                    <button className="btn btn-light" onClick={() => { this.sendMessage(this.state.name, this.props.user.display_name, this.state.newMessage) }}>BLAST</button>
                </div>
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