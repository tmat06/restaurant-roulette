import React, { Component } from 'react';
import MainButton from './../MainButton/MainButton';
import Drawer from 'material-ui/Drawer';


export default class Nav extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        return this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div>
                
                <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} handleToggle = {this.handleToggle} />
                <Drawer
                    width={200}
                    open={this.state.open}>
                    <button onClick={() => this.handleToggle()}>---></button>
                    <div>Tbone</div>
                    <div>Tbone</div>
                    <div>Tbone</div>
                    <div>Tbone</div>
                </Drawer>
                <MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F' }} />
            </div>
        )
    }
}
