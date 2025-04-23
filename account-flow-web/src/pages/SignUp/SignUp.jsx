import React, { useState } from "react";
import { Button, Input } from "../../components/common";
import { CircularProgress } from "@mui/material";
import styles from "./SignUp.module.scss";
import useAuthStore from "../../core/stores/authStore";
import useCommonStore from "../../core/stores/commonStore";

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const { loading } = useCommonStore();
  const { signup } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Create Account</h1>
        <form className={`${styles.form} ${loading ? styles.contentLoading : ""}`} onSubmit={handleSubmit}>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            label="Username"
            required
            error={errors.username}
            disabled={loading}
          />
          
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            label="Password"
            required
            error={errors.password}
            disabled={loading}
          />
          
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
            required
            error={errors.confirmPassword}
            disabled={loading}
          />
          
          <div className={styles.termsAgreement}>
            By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </div>
          
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            Sign Up
          </Button>
        </form>
        
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </div>
        
        {loading && (
          <div className={styles.loadingOverlay}>
            <CircularProgress 
              size={50}
              thickness={4}
              color="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;