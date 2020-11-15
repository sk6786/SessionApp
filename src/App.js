import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import LoginPage from './components/loginPage'
import ForbiddenPage from './components/forbiddenPage'
import LayoutWrapper from './components/layoutWrapper';
import SuperAdminPage from './components/superAdminPage';
import AdminPage from './components/adminPage';
import UserPage from './components/userPage';
import NotFoundPage from './components/notFoundPage'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/403" exact component={ForbiddenPage} />
            <Route component={withNav}></Route>
        </Switch>
      </Router>
    );
  }
}

const withNav = () => (
  <div className="App">
    <LayoutWrapper>
        <Route path="/superadmin_page" component={SuperAdminPage} />
        <Route path="/admin_page" component={AdminPage} />
        <Route path="/user_page" component={UserPage} />
        <Route component={NotFoundPage} />
    </LayoutWrapper>
  </div>
)

