import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logout from "./components/logout";

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
          {/* <Movies></Movies> */}
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>

            {/* <Route
              path="/movies/:id"
              render={props => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            /> */}

            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            ></Route>

            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
          {/* <Redirect to="/not-found" /> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
