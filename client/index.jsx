import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './assets/sass/materialize.scss';
import './assets/js/main';


// Import the layouts
import MainLayout from './components/layouts/Main';
import HomeLayout from './components/layouts/Home';

// Import components
import Books from './components/books/Books';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Dashboard from './components/dashboard/Dashboard';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={HomeLayout}>
        <Route path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Route>
      <Route component={MainLayout}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/books" component={Books} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
