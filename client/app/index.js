import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter,  Route, Switch} from 'react-router-dom';
import {Login} from './components/authentication/Login';
//import Header from './components/main/Header';
import {Dashboard} from './components/main/Dashboard';

class BaseLayout extends React.Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}


class App extends React.Component{
    render(){
        return (
            <BrowserRouter history={browserHistory}>
                <BaseLayout/>
            </BrowserRouter>
        );
    }
}

render (<Login/>, window.document.getElementById('root'));