import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Navbar } from "../../components/common";
import {
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import styles from "./UserDetail.module.scss";
import useUserStore from "../../core/stores/userStore";
import useCommonStore from "../../core/stores/commonStore";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, fetchDialog, resetDialog, error } = useCommonStore();
  const { getUserDetail, user, deleteUser, updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    getUserDetail(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        status: user.status || "active",
      });
    }
  }, [user]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleDeleteUser = () => {
    fetchDialog(
      true,
      {
        title: "Delete User",
        message: "Are you sure you want to delete this user?",
        labelSubmit: "Delete",
        labelCancel: "Cancel",
      },
      () => {
        deleteUser(id);
      },
      resetDialog
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form values to original user data
    if (user) {
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        status: user.status || "active",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    updateUser(formValues);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        <div className={styles.containerHeader}>
          <h1 className={styles.title}>User Details</h1>
          <Button variant="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>

        <div className={loading ? styles.contentLoading : ""}>
          {user && (
            <div className={styles.card}>
              <div className={styles.row}>
                <div className={styles.label}>ID:</div>
                <div className={styles.value}>{user.id}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Username:</div>
                <div className={styles.value}>{user.username}</div>
              </div>

              {isEditing ? (
                <>
                  <div className={styles.row}>
                    <div className={styles.label}>Email:</div>
                    <div className={styles.value}>
                      <TextField
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Name:</div>
                    <div className={styles.value}>
                      <TextField
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Status:</div>
                    <div className={styles.value}>
                      <FormControl fullWidth size="small">
                        <Select
                          name="status"
                          value={formValues.status}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.row}>
                    <div className={styles.label}>Email:</div>
                    <div className={styles.value}>{user.email}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Name:</div>
                    <div className={styles.value}>{user.name}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Status:</div>
                    <div className={styles.value}>
                      <span
                        className={`${styles.status} ${styles[user?.status]}`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className={styles.row}>
                <div className={styles.label}>Created At:</div>
                <div className={styles.value}>
                  {new Date(user.createdAt).toLocaleString()}
                </div>
              </div>

              <div className={styles.actions}>
                {isEditing ? (
                  <>
                    <Button variant="primary" onClick={handleUpdateUser}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" onClick={handleEditClick}>
                      Update User
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                      Delete User
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {!loading && !user && (
            <div className={styles.error}>
              <h2>User not found</h2>
              <Button variant="primary" onClick={handleGoBack}>
                Go Back
              </Button>
            </div>
          )}
        </div>

        {loading && (
          <div className={styles.loadingOverlay}>
            <CircularProgress size={60} thickness={4} color="primary" />
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
