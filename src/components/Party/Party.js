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
            console.log('got socket reponse:', data)
            let newMessage = [...this.state.messages];
            newMessage.push(data.message);

            axios.get('/chatMessage')
            .then(messages => {
                console.log("messages after send", messages.data)
                this.setState({
                    messages: [...messages.data]
                })
            })
            // const roomArr = [...this.state.rooms];
            // roomArr.map(val => {
            //   if (val.name === data.name) val.messages.push(data.message); //checks if name of chat matches one of the chat rooms user has joined
            //   return val;
            // });
            // axios.get('/chatMessage')
            //     .then(response => {

            //     })
            this.setState({ messages: newMessage, newMessage: '' });
            this.rerenderMe(data)
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
    rerenderMe(data){
        console.log('rerendering...')
        let newMessage = [...this.state.messages];
        newMessage.push(data.message);
        // const roomArr = [...this.state.rooms];
        // roomArr.map(val => {
        //   if (val.name === data.name) val.messages.push(data.message); //checks if name of chat matches one of the chat rooms user has joined
        //   return val;
        // });
        // axios.get('/chatMessage')
        //     .then(response => {

        //     })
        console.log('new maessage: ',newMessage)
        this.setState({ messages: newMessage, newMessage: '' });
    }
    componentDidMount() {
        axios.get('/chatMessage')
            .then(messages => {
                this.setState({
                    messages: [...messages.data]
                })
            })
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }

    sendMessage(roomName, displayName, message) {
        // 
        socket.emit('blast message', { name: 'testname', displayName: 'testname', message:'message' });

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
        const messages = this.state.messages.map((e, i) => <p key={i}>{e}</p>)
        return (
            <div className='homie' style={{ height: '81vh', backgroundColor: '#F64548' }}>
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


                <div className='thisGuy' style={{ margin: '0', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', alignItems: 'left', padding: '20px 0 5px 0', backgroundColor: '#F64548' }} >
                    {this.state.messages.map((val, i) => {
                        return (
                            <div key={i} className='dog' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'left', width: '100%', backgroundColor: '#FFE49F', fontFamily: 'Luckiest Guy, cursive', fontSize: '20px', color: '#F64548', padding: '0 0 0 20px'}} >
                                <div style={{display: 'flex', textShadow: '1px 1px 1px black', fontSize: '25px'}}>
                                    {val.name}
                                </div>
                                <div></div>
                                <div>
                                    {val.message}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{ height: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFE49F', borderRadius: '15px' }}>
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