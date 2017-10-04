import React from 'react';
import {render} from 'react-dom';


export const User = (props) => {
    return (
        <div>
            <p>I am the home!</p>
        </div>
    )
}

render(<User/>, window.document.getElementById('myDiv'));