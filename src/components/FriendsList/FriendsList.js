import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';


class FriendsList extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
        }
    }
    // console.log(this.props)

    componentDidMount() {
        axios.get('/userList/')
            .then(users => {
                this.setState({
                    users: users.data,
                })
            })

    }



    displayUsers() {


        // console.log('props.friends', props.friends)
        // return props.friends.map((val, i) => {
        // console.log('users.data', users.data)
        return this.state.users.map((val, i) => {

            // console.log('current user id', props.user.auth_id)
            // console.log('val.auth_id', val.auth_id)
            // console.log(val.display_name)
            if (val.auth_id !== this.props.user.auth_id) {
                // console.log('hittin dawg')

                // console.log('val.display_name', val.display_name)
                // console.log('val.img', val.img)

                if (val.img) {

                    // axios.get('/norrisQuote')
                    // .then(results => {
                    //     this.setState({
                    //         quote: results.data.value
                    //     })
                    // })

                    return (
                        <div key={i} className='friendsBox'>
                            <h2 style={{fontFamily: 'Luckiest Guy, cursive', color: '#F64548', textShadow: '1px 1px 1px black'}} >{val.display_name}</h2>
                            <div className='friendPic'>
                                <div>
                                    <img src={val.img} alt="tommy" height="100px" width="100px" />
                                </div>
                                <div>

                                    {/* {this.state.quote} */}
                                </div>
                            </div>
                        </div>
                    )
                } else {

                    return (
                        <div key={i} className='friendsBox'>
                            <h2>{val.display_name}</h2>
                            <div className='friendPic'>
                                <div>
                                    <img src={'https://cdn4.littlethings.com/app/uploads/2017/05/funny-dog-names-three-600x600.jpg'} alt="tommy" height="100px" width="100px" />
                                </div>
                                <div>

                                    {/* {this.state.quote} */}
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        })
    }

    render() {

        return (
            <div style={{ backgroundColor: '#F64548' }}>
                <Nav />
                <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '50px', backgroundColor: '#F64548', width: '100%' }}>

                    <Link to='/dashboard'><FlatButton label='Back' fullWidth={true} labelStyle={{ fontSize: '30px' }} style={{ color: '#FFE49F', fontFamily: 'Luckiest Guy, cursive' }} /></Link>
                </div>
                <div style={{ marginTop: '85px' }}>

                    {this.displayUsers()}
                </div>
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        friends: state.friends,
        user: state.user
    };
}

export default connect(mapStateToProps)(FriendsList);