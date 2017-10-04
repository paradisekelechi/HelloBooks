import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

//Import components
import {Header} from './components/Header';
import {Navigation} from './components/Navigation';
import {Footer} from './components/Footer';


//Define the layout for the authentication components
const Authentication_layout = (props) => {
    return(
        <div>
            {props.children}
            <Footer />
        </div>
    );
}

//Define the layout for the main components
const Main_Layout = (props) => {
    return(
        <div>
            <Header />
            <Navigation />
            <small>
                The main layout is used
            </small>
            {props.children}
            <Footer />
        </div>
    );
}

//Define the home component
class Home extends React.Component{
    render(){
        return(
            <div>
                <p>This is the home component</p>
            </div>
        );
    }
}

//Define the Signin component
class Signin extends React.Component {
    render(){
        return(
            <div>
                <Authentication_layout>
                    <div  className="container">
                        <div  className="row login-logo">
                        <div  className="col m12">
                            <span  className="brand-logo">HelloBooks</span>
                        </div>
                        </div>

                        <div  className="row authentication-row">
                        <div  className="col m4 offset-m4">

                            <h5  className="center authentication-header">Account Signin</h5>
                            <div  className="col s12">
                            <button  className="waves-effect waves-light btn col s12 red ">Google Plus Signin</button>
                            </div>
                            <div  className="col s12">
                            <br/>
                            <p  className="center">OR</p>
                            </div>

                            <div  className="input-field col s12">
                            <input id="last_name" type="text"  className="validate" />
                            <label>Username</label>
                            </div>
                            <div  className="input-field col s12 ">
                            <input id="last_name" type="text"  className="validate" />
                            <label>Password</label>
                            </div>
                            <div  className="col s12">
                            <button  className="waves-effect waves-light btn btn-large col s12 blue darken-3 ">Signin</button>
                            </div>
                            <div  className="col s12">
                            <br/>
                            <small  className="">Not yet a User?</small>
                            <br/>
                            </div>
                            <div  className="col s12">
                                <br/>
                                <button   className="waves-effect waves-light btn col s12 blue darken-3">Register</button>
                            </div>

                        </div>
                        </div>
                    </div>
                </Authentication_layout>
            </div>
        );
    }
}

//Define the SIgnup components
class Signup extends React.Component {
    render(){
        return(
            <div>
                <Authentication_layout>
                    <p>This is the Signup component</p>
                </Authentication_layout>
            </div>
        );
    }
}

//Define the Profile component
class Profile extends React.Component{
    render(){
        return(
            <div>
                <Main_Layout>
                    <p>This is the profile page</p>
                </Main_Layout>
            </div>
        );
    }
}

class App extends React.Component {
    render(){
        return(
            <div className= 'theme-dark' >
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signin' component={Signin} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/profile' component={Profile} />
                </Switch>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    window.document.getElementById('root')
);