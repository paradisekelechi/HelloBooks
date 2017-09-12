import React from 'react';
import {render} from 'react-dom';

export  class Login extends React.Component{
    render(){
        return(
            <div>
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
            </div>
        );
    }
}