import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './assets/sass/materialize.scss';
import './assets/js/main';


// Import the layouts
import HomeLayout from './components/layouts/Home';

// Import components
import BooksBorrowCatalog from './components/books/borrow/BooksCatalog';
import BooksReturnCatalog from './components/books/return/BooksCatalog';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Signin from './components/authentication/Signin';
import Signup from './components/authentication/Signup';
import Dashboard from './components/dashboard/Dashboard';
import authorize from './utils/helpers/AuthorizeUser';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={HomeLayout}>
        <Route path="/" component={Home} />
        <Route path="/books" component={BooksBorrowCatalog} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/history" component={authorize(BooksReturnCatalog)} />
        <Route name="profile" path="/profile" component={authorize(Profile)} />
        <Route name="dashboard" path="/dashboard" component={authorize(Dashboard)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
