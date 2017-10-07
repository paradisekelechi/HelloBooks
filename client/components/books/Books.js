import React from 'react';
import {Link} from 'react-router';
 /**
  * 
  * 
  * @class Books
  * @extends {React.Component}
  */
class Books extends React.Component{
    /**
     * @returns 
     * @memberof Books
     */
    render(){
        return (
            <div className="col m12">
                <div className="col m8 offset-m4 main-content">
                    <div className="row account-info account-details-bar">
                        <span>BOOKS</span>
                        <i className="material-icons option right">power_settings_new</i>
                    </div>

                    <div className="row">
                        <div className="col m2 s12 offset-m1">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg"/>
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div className="row">
                        <div className="col m2 s12 offset-m1">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div>

                        <div className="col m2 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src="img/java.jpg" />
                                </div>
                                <div className="card-content">
                                    <p><b>Java - How To Program</b></p>
                                </div>
                                <div className="card-action">
                                    <a href="#"><button className="waves-effect waves-light btn action-button">Edit</button></a>
                                </div>
                            </div>
                        </div> 

                    </div>

                    <div className="row ">
                        <div className="col m6 push-m6">
                            <ul className="pagination">
                                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                                <li className="active"><a href="#!">1</a></li>
                                <li className="waves-effect"><a href="#!">2</a></li>
                                <li className="waves-effect"><a href="#!">3</a></li>
                                <li className="waves-effect"><a href="#!">4</a></li>
                                <li className="waves-effect"><a href="#!">5</a></li>
                                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Books;