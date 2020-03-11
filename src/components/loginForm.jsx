import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    //call the server

    try {
      const { data } = this.state;
      // const { data: jwt } = await login(data.username, data.password); //result --> {data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…TkwfQ.uJqoUBJjiMDvLgPsnUH0NRg8697XEREokz4815eO2_4", status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      // console.log("jwt", jwt);
      await auth.login(data.username, data.password); //result --> {data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…TkwfQ.uJqoUBJjiMDvLgPsnUH0NRg8697XEREokz4815eO2_4", status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      // this.props.history.push("/");
      const { state } = this.props.location;
      // console.log("this.props.location", this.props.location);
      //this.props.location --> {pathname: "/login", state: {from: {pathname: "/movies/5e645986a8b9723f5c01a0d9", search: "", hash: "", state: undefined, key: "youbhc"}}, search: "", hash: "", key: "svlvq2"}

      window.location = state ? state.from.pathname : "/";
      console.log("Submitted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // const { data, errors } = this.state;

    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          {/* <Input
            name="username"
            label="Username"
            value={data.username}
            onChange={this.handleChange}
            error={errors.username}
          ></Input>
          <Input
            name="password"
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            error={errors.password}
          ></Input> */}
        </form>
      </div>
    );
  }
}

export default LoginForm;
