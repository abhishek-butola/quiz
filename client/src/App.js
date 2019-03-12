import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Welcome from './components/Welcome';
import Question from './components/Question';
import Dashboard from './components/Dashboard';
import Submit from './components/Submit';
import AddQuestion from './components/AddQuestion';
import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Route exact path="/" component={Welcome} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/question" component={Question} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/submit" component={Submit} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add" component={AddQuestion} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
