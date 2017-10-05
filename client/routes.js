import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App.js';
import Books from './components/books/Books';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Dashboard from './components/dashboard/Dashboard';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="books" component={Books} />
        <Route path='profile' component={Profile} />
    </Route>
);