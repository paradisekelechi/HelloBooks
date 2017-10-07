import React from 'react';
import {Link} from 'react-router';

const Navigation = () => {
    return(
        <nav className="white" role="navigation">
            <div className="nav-wrapper container">
                <a id="logo-container" href="#" className="brand-logo">HelloBooks</a>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/signin" >Signin</Link>
                    </li>
                    <li>
                        <Link to="/signup" >Signup</Link>
                    </li>
                </ul>

                <ul id="nav-mobile" className="side-nav">
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/signin" >Signin</Link>
                    </li>
                    <li>
                        <Link to="/signup" >Signup</Link>
                    </li>
                </ul>
                <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
        </nav>
    );
}

export default Navigation;