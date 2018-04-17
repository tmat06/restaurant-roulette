import React, { Component } from 'react';
import MainButton from './../MainButton/MainButton';
import Drawer from 'material-ui/Drawer';
import Profile from './../Profile/Profile';
import Party from './../Party/Party';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';



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
        return (
            <div className='navMenu'>
                <div>
                    <MainButton name="Profile" wholeWidth={false} style={{ backgroundColor: '#FFE49F', boxShadow: '0'}} handleToggle={() => this.handleToggle('2')} />
                    <Drawer
                        width={400}
                        open={this.state.open2}>
                        <Profile style={{ margin: '0' }} handleToggle={this.handleToggle} toggle='2' history={this.props.history}/>
                    </Drawer>
                </div>

                <div>
                    <MainButton name="Party" wholeWidth={false} style={{ backgroundColor: '#FFE49F', boxShadow: '0' }} handleToggle={() => this.handleToggle('1')} />
                    <Drawer
                        width={400}
                        open={this.state.open1}
                        openSecondary={true}>
                        <MainButton name="RETURN" icon={<ArrowBack />} handleToggle={this.handleToggle} toggle={'1'} wholeWidth={true} style={{ color: '#F64548', borderRadius: '0px', display: 'flex', justifyContent: 'center', margin: '0' }} />

                        <Party />
                    </Drawer>
                </div>


            </div>

        )
    }
}
