import React, {PropTypes} from 'react';

//Import the common layout components
import Navigation from '../common/home/Navigation';
import Footer from '../common/Footer';

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
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Home.propTypes = {
    children: PropTypes.object.isRequired
}

export default Home;