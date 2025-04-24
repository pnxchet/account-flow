import React, { useState, useEffect } from "react";
import { UserCard, Navbar } from "../../components/common";
import { CircularProgress, Alert } from "@mui/material";
import styles from "./Home.module.scss";
import useUserStore from "../../core/stores/userStore";
import useCommonStore from "../../core/stores/commonStore";

const Home = () => {
  const { users, getUsers } = useUserStore();
  const { loading, error } = useCommonStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>System Users</h1>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <div className={loading ? styles.contentLoading : ""}>
          <div className={styles.summary}>
            {users.length} {users.length === 1 ? "user" : "users"} found
          </div>

          {users ? (
            <div className={styles.grid}>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>No users found in the system.</div>
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

export default Home;
