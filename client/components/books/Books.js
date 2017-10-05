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
            <div>
                <p>This is the books component</p>
                <Link to="books">Books Link</Link>
            </div>
        );
    }
}

export default Books;