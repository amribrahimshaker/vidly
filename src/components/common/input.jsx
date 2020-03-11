import React from "react";

const Input = props => {
  // const { name, label, error, value, onChange, type } = props;
  const { name, label, error, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className="form-control"
      /> */}
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
