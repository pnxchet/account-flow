import React from "react";
import styles from "./Button.module.scss";

const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  onClick, 
  disabled = false,
  fullWidth = false,
  className = ""
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;