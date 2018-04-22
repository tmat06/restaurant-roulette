import React, { Component } from 'react';
import MainButton from './../MainButton/MainButton';
import Drawer from 'material-ui/Drawer';
import Profile from './../Profile/Profile';
import Party from './../Party/Party';
import FlatButton from 'material-ui/FlatButton';


export default class Nav extends Component {
    constructor() {
        super()
        this.state = {
            open1: false,
            open2: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(num) {
        switch (num) {
            case '1':
                this.setState({
                    open1: !this.state.open1
                })
                break;
            case '2':
                this.setState({
                    open2: !this.state.open2
                })
                break;
            default:
                break;
        }
    }



    render() {

        let style = {
            color: '#F64548',
            fontFamily: 'Carter One, cursive',
            fontSize: 20,
            borderRadius: 25,
            backgroundColor: '#FFE49F',
            margin: '0px',
            backgroundColor: '#FFE49F', 
            boxShadow: '0' 
        }

        return (
            <div className='navMenu' style={{ zIndex: '2' }}>
                <div>
                    <FlatButton label="Profile" fullWidth={false} style={style} onClick={() => this.handleToggle('2')} labelStyle={{fontSize: '30px'}} />
                    {/* <MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F', boxShadow: '0' }} handleToggle={() => this.handleToggle('2')} /> */}

                    <Drawer
                        // className='drawerWidth'
                        width={400} //400
                        open={this.state.open2}>
                        <Profile style={{ margin: '0' }} handleToggle={this.handleToggle} toggle='2' history={this.props.history} />
                    </Drawer>
                </div>

                <div>

                    <FlatButton label="Chat" fullWidth={false} style={style} onClick={() => this.handleToggle('1')} labelStyle={{fontSize: '30px'}}/>

                    {/* <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F', boxShadow: '0' }} handleToggle={() => this.handleToggle('1')} /> */}
                    <Drawer
                        width={400}
                        open={this.state.open1}
                        openSecondary={true}>

                        <Party  handleToggle={this.handleToggle} toggle='1'/>
                    </Drawer>
                </div>


            </div>

        )
    }
}
