import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import SpinResults from './components/SpinResults/SpinResults';
import FriendsList from './components/FriendsList/FriendsList';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import RunnerUps from './components/RunnerUps/RunnerUps';
import GoogleDirections from './components/GoogleDirections/GoogleDirections';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Dashboard} path='/dashboard'/>
        <Route component={SpinResults} path='/spin-results'/>
        <Route component={FriendsList} path='/friends-list'/>
        <Route component={RestaurantPage} path='/restaurant-page'/>
        <Route component={RunnerUps} path='/runner-up'/>
        <Route component={GoogleDirections} path='/google-directions'/>
    </Switch>
)