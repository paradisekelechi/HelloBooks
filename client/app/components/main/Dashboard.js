import React from 'react';
import {render} from 'react-dom';

export class Dashboard extends React.Component{
    render(){
        return(
            <div>
               <div className="custom-nav">
                    <ul id="slide-out" className="side-nav fixed">
                    <span className="dashboard-logo brand-logo">HelloBooks</span>
                    <div className="container">
                        <hr/>
                    </div>
                    <div className="row hbk-row">
                        <div className="col m6 offset-m3 col s8 offset-s2">
                        <img src="img/profile.jpg" className="responsive-img circle" width="100%"/>
                        <span>user@user.com</span>
                        </div>
                    </div>
                    
                    <li className=" active indigo nav-link"><a href="#!" className="white-text"><i className="material-icons white-text">dashboard</i>DASHBOARD</a></li>
                    <li className="nav-link"> <i className="material-icons">face</i>PROFILE</li>
                    <li className="nav-link"> <i className="material-icons">settings_applications</i>SETTINGS</li>
                    <li className="nav-link"> <i className="material-icons">book</i>BOOKS</li>
                    <li className="nav-link"> <i className="material-icons">mail_outline</i>NOTIFICATIONS</li>
                    
                    </ul>
                </div>
                <a href="#" data-activates="slide-out" className="button-collapse account-slideout account-info"><i className="material-icons">menu</i></a> 
            </div>
        );
    }
}