import React from 'react';

/**
 * 
 * 
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component{
    /**
     * 
     * 
     * @returns 
     * @memberof Dashboard
     */
    render(){
        return(
            <div className="col m12">
                <div className="col m8 offset-m4 main-content">
                    <div className="row account-info account-details-bar">
                        <span>DASHBOARD</span>
                        <i className="material-icons option right">power_settings_new</i>
                    </div>

                    <div className="row">
                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content ">
                                <span className="card-title center">Total Books</span>
                                <h4 className="center counter">50</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content ">
                                <span className="card-title center">Books Deleted</span>
                                <h4 className="center counter">0</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content ">
                                <span className="card-title center">Books Borrowed</span>
                                <h4 className="center counter">10</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content">
                                <span className="card-title center">Books Available</span>
                                <h4 className="center counter">40</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content">
                                <span className="card-title center">Total Users</span>
                                <h4 className="center counter">15</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card blue white">
                                <div className="card-content ">
                                <span className="card-title center">Deleted Users</span>
                                <h4 className="center counter">3</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content">
                                <span className="card-title center">Active Users</span>
                                <h4 className="center counter">12</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col m3 s12">
                            <div className="card white">
                                <div className="card-content ">
                                <span className="card-title center">Admin Users</span>
                                <h4 className="center counter">2</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m6 s12">
                            <ul className="collapsible popout" data-collapsible="accordion">
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_pin</i>Admin User</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Client User</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Temporary User</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                            </ul>
                        </div>

                        <div className="col m6 s12">
                            <ul className="collapsible popout" data-collapsible="accordion">
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Platinium Client Account</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Gold Client Account</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Silver Client Account</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;