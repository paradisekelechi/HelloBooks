import React from 'react';

import bg from  '../../assets/img/background6.jpeg';

/**
 * 
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component{
    /**
     * 
     * 
     * @returns 
     * @memberof Home
     */
    render(){
        return(
            <div>
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                    <div className="container">
                        <br/><br/>
                        <h1 className="header center blue-text text-darken-4">HelloBooks Online Library</h1>
                        <div className="row center">
                        <h5 className="header col s12 light blue-text text-darken-4">A World className Online Book Library Application. Borrow  A Book Today!</h5>
                        </div>
                        <br/><br/>

                    </div>
                    </div>
                    <div className="parallax"><img src={bg} alt="Unsplashed background img 1"/></div>
                </div>

                <div className="container">
                    <div className="section application-info">

                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h5 className="center">Borrow Books</h5>

                                    <p className="light"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h5 className="center">Read Books</h5>

                                    <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h5 className="center">View Books</h5>

                                    <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;