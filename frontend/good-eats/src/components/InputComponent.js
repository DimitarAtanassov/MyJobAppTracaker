import React from 'react';

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;