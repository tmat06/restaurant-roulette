import React, { Component } from 'react';
import MainButton from './../MainButton/MainButton';
import Drawer from 'material-ui/Drawer';
import Profile from './../Profile/Profile';
import Party from './../Party/Party';


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
        switch(num){
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
        return (
            <div>
                
                <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} handleToggle = {() => this.handleToggle('1')} />
                <Drawer
                    width={400}
                    open={this.state.open1}>
                    <button onClick={() => this.handleToggle('1')}>---></button>
                    <Party />
                </Drawer>
                <MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} handleToggle = {() => this.handleToggle('2')}/>
                <Drawer
                    width={400}
                    open={this.state.open2}
                    openSecondary={true}>
                    <button onClick={() => this.handleToggle('2')}>$-----</button>
                    <Profile/>
                </Drawer>
            </div>
            
        )
    }
}
