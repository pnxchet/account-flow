import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Navbar } from "../../components/common";
import {
  CircularProgress,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import styles from "./CreateUser.module.scss";
import useUserStore from "../../core/stores/userStore";
import useCommonStore from "../../core/stores/commonStore";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    status: true,
  });

  const { loading, error } = useCommonStore();
  const { createUser } = useUserStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
    };

    await createUser(userData);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formCard}>
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}
          <h1 className={styles.title}>Create New User</h1>
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
              placeholder="Enter username"
              label="Username"
              required
              disabled={loading}
            />

            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              label="Email"
              required
              disabled={loading}
            />

            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              label="Name"
              required
              disabled={loading}
            />

            <div className={styles.switchField}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status}
                    onChange={handleSwitchChange}
                    name="status"
                    color="primary"
                    disabled={loading}
                  />
                }
                label="Active User"
              />
            </div>

            <div className={styles.actionButtons}>
              <Button type="submit" variant="primary" disabled={loading}>
                Create User
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>

          {loading && (
            <div className={styles.loadingOverlay}>
              <CircularProgress size={50} thickness={4} color="primary" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateUser;
