import React from 'react';

import NavigationCard from '../components/NavigationCard';

const Navigation = () => {
  return (
    <nav className="navigation app-navigation">
      <div className="nav-wrapper container-fluid">
        <div className="row">
          <div className="col m1">

          </div>
          <NavigationCard
            title="Home"
            description="Welcome and Landing page"
            link="/"
          />
          <NavigationCard
            title="Books"
            description="Collection of Books"
            link="/books"
          />
          <NavigationCard
            title="About"
            description="Description of the application"
            link="/about"
          />
          <NavigationCard
            title="Register"
            description="Signup into the application"
            link="/signup"
          />
          <NavigationCard
            title="Login"
            description="Signin to application"
            link="/signin"
          />

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
