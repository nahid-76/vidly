import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFounf from './components/not-found';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/register';
import { render } from '@testing-library/react';
import Logout from './components/logout';
import auth from './serveces/authService';
import ProtectedRoute from './components/common/protectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={Register}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFounf}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
