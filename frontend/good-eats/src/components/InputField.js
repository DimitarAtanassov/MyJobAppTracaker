import React from 'react';

const InputField = ({ label, type, name, value, onChange, style }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} style={style} />
    </div>
  );
};

export default InputField;
