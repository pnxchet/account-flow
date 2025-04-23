import React, { useState } from "react";
import { Button, Input } from "../../components/common";
import { CircularProgress, Alert } from "@mui/material";
import styles from "./Login.module.scss";
import useAuthStore from "../../core/stores/authStore";
import useCommonStore from "../../core/stores/commonStore";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loading, error } = useCommonStore();
  const { login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        <h1 className={styles.title}>Login</h1>
        <form
          className={`${styles.form} ${loading ? styles.contentLoading : ""}`}
          onSubmit={handleSubmit}
        >
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            label="Username"
            disabled={loading}
          />

          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            disabled={loading}
          />

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            Login
          </Button>
        </form>
        <div className={styles.signupLink}>
          Don't have an account? <a href="/signup">Sign up</a>
        </div>

        {loading && (
          <div className={styles.loadingOverlay}>
            <CircularProgress size={50} thickness={4} color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
