import 'babel-polyfill';
import {render} from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';
import React from 'react';


//Import styles 
import './assets/css/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Import the layouts 
import MainLayout from './components/layouts/Main.js';
import AuthenicationLayout from './components/layouts/Authentication.js';
import HomeLayout from './components/layouts/Home.js';

//Import components
import Books from './components/books/Books';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';

render(
    <Router history={browserHistory}>
        <Route component={HomeLayout}>
            <Route path="/" component={Home} />
        </Route>
        <Route component={AuthenicationLayout}>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
        </Route>
        <Route component={MainLayout}>
            <Route path="books" component={Books} />
            <Route path='profile' component={Profile} />
        </Route>
    </Router>,
    document.getElementById('application')
);