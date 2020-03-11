import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

// const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  //   console.log(rest); //{path: "/movies/:id", location: {…}, computedMatch: {…}}
  return (
    <Route
      //   path={path} //rely on rest element
      {...rest}
      render={props => {
        // console.log(props); // {history: {…}, location: {pathname: "/movies/5e645986a8b9723f5c01a0d5", search: "", hash: "", state: undefined, key: "1meuyu"}, match: {…}, staticContext: undefined}

        // if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
