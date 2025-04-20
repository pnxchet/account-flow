import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  error,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ""} ${disabled ? styles.disabled : ""} ${className}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;