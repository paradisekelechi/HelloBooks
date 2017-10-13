import React from 'react';

const AdminDashboard = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content ">
                        <span className="card-title center">Total Books</span>
                        <h4 className="center counter">{props.books.total}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content ">
                        <span className="card-title center">Books Deleted</span>
                        <h4 className="center counter">{props.books.pending}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content ">
                        <span className="card-title center">Books Borrowed</span>
                        <h4 className="center counter">{props.books.borrowed}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content">
                        <span className="card-title center">Books Available</span>
                        <h4 className="center counter">{props.books.available}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content">
                        <span className="card-title center">Total Users</span>
                        <h4 className="center counter">{props.users.total}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card blue white">
                        <div className="card-content ">
                        <span className="card-title center">Deleted Users</span>
                        <h4 className="center counter">{props.users.deleted}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content">
                        <span className="card-title center">Active Users</span>
                        <h4 className="center counter">{props.users.active}</h4>
                        </div>
                    </div>
                </div>

                <div className="col m3 s12">
                    <div className="card white">
                        <div className="card-content ">
                        <span className="card-title center">Admin Users</span>
                        <h4 className="center counter">{props.users.admin}</h4>
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
    );
}

export default AdminDashboard;