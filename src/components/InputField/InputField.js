import React, { useState } from "react";
import "./InputField.css";

function InputField({
  className = "",
  placeholder = "",
  errorMessage = "Invalid input",
  type = "text",
  value,
  validateField,
  onChange
}) {
  const [isError, setIsError] = useState(false);

  let onChangeHandler = function (e) {
    const val = e.target.value;
    onChange(val);
    const isValid = validateField(val);
    setIsError(isValid ? false : true);
  };

  return (
    <div className="input-field-container">
      <input
        type={type}
        className={`${className} ${isError ? "error" : ""}`}
        placeholder={placeholder}
        onFocus={() => setIsError(false)}
        value={value}
        onChange={onChangeHandler}
      />
      {isError && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

export default InputField;
