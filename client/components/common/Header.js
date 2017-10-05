import React, {PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';

const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active" >Home</IndexLink>
            {"|"}
            <Link to="/books" activeClassName="active">Books</Link>
            {"|"}
            <Link to="/profile" activeClassName="active">Profile</Link>
        </nav>
    );
};

export default Header;