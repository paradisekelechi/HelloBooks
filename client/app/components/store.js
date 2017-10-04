import React from 'react';
import { render} from 'react-dom';
import {Header} from './components/Header';
import {User} from './components/User';
import {BrowserRouter, Route, Redirect, browserHistory} from 'react-router-dom';



const Homepage = (props) => {
    return (
        <div className="homepage">
            <p>Homepage</p>
        </div>
    );
}

const AppUser = (props) => {
    return (
        <div className="AppUser">
            <p>User</p>
        </div>
    );
}

const AppProfile = (props) => {
    return (
        <div className="AppProfile">
            <p>Profile</p>
        </div>
    );
}

const AppBook = (props) => {
    return (
        <div className="AppBook">
            <p>Book</p>
        </div>
    );
}

const PrimaryLayout = (props) => {
    return (
        <div className="primaryLayout">
            <header>
                React test App
            </header>
            <main>
                <switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/users" exact component={AppUser} />
                    <Route path="/users/:userid" component={AppProfile} />
                    <Route path="/books" exact component={AppBook} />
                    
                </switch>
            </main>
        </div>
    );
}

const Application = () => {
    return(
        <BrowserRouter>
            <PrimaryLayout />
        </BrowserRouter>
    );
}





render(<Application/>, window.document.getElementById('myDiv'));