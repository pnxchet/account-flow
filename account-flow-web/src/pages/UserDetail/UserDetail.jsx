import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Navbar } from "../../components/common";
import { CircularProgress } from "@mui/material";
import styles from "./UserDetail.module.scss";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data for demonstration
        const mockUser = {
          id: parseInt(id),
          username: `user${id}`,
          email: `user${id}@example.com`,
          fullName: `User ${id}`,
          createdAt: "2025-02-15T10:30:00Z",
          status: "Active",
          role: "User",
        };

        setUser(mockUser);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        
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
              <div className={styles.row}>
                <div className={styles.label}>Email:</div>
                <div className={styles.value}>{user.email}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Created At:</div>
                <div className={styles.value}>
                  {new Date(user.createdAt).toLocaleString()}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Status:</div>
                <div className={styles.value}>
                  <span
                    className={`${styles.status} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
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