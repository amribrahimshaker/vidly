import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  //   state = {
  //     data: {},
  //     errors: {}
  //   };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    // console.log("result ", result);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    /*
    const errors = {};
    const { data } = this.state;
    if (data.username.trim() === "")
        errors.username = "Username is required.";
    if (data.password.trim() === "")
        errors.password = "Password is required.";
    return Object.keys(errors).length === 0 ? null : errors;
    */
  };

  validateProperty = input => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema); // destruct to get result.error

    return error ? error.details[0].message : null;
    /*
    const { name, value } = input;
    if (name === "username") {
        if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
        if (value.trim() === "") return "Password is required.";
    }
    */
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    // console.log("handleChange", e.target.name);
    const { target: input } = e;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // console.log("handleChange errors", errors);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
