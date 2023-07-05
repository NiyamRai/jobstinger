import React from "react";

const FormRow = ({ type, name, value, handleChange, lableText }) => {
  return (
    <div className="form-row">
      <lable htmlFor={name} className="form-lable">
        {lableText || name}
      </lable>
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
