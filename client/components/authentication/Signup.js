import React from 'react';

/*eslint-disable no-console */
/**
 * 
 * 
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component{
    
    /**
     * Creates an instance of Signup.
     * @param {any} props 
     * @memberof Signup
     */
    constructor(props){
        super(props);
        this.state = {'value': ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * 
     * @returns {S} description
     * @param {any} event 
     * @memberof Signup
     */
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    /**
     * 
     * @returns {type} description
     * @param {any} event 
     * @memberof Signup
     */
    handleSubmit(event){
        event.preventDefault;
        console.log(this.state.value);
    }
    
    /**
     * 
     * 
     * @returns 
     * @memberof Signup
     */
    render(){
        return(
            <div className="container">
                <div className="row authentication-row">
                    <div className="col m4 offset-m4">
                        <h5 className="center authentication-header">Register Account</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field col s12">
                                <input id="email" type="text" className="validate" />
                                <label>Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="username" type="text" onChange={this.handleChange} className="validate" />
                                <label>Username</label>
                            </div>
                            <div className="input-field col s12 ">
                                <input id="password" type="text" className="validate" />
                                <label>Password</label>
                            </div>
                            <div className="col s12">
                                <a href="dashboard-admin.html">
                                <button type="submit" className="waves-effect waves-light btn btn-large col s12 blue darken-3 ">Register</button>
                                </a>
                            </div>
                        </form>
                        <div className="col s12">
                            <br/>
                            <small className="">Already a User?</small>
                            <br/>
                        </div>
                        <div className="col s12">
                            <br />
                            <a href="register.html">
                                <button className="waves-effect waves-light btn col s12 blue darken-3">Signin</button>
                            </a>
                        </div>
                        
                    </div>
                </div>

            </div>
        );
    }
}

export default Signup;