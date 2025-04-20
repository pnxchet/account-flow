import React, { useState, useEffect } from "react";
import { UserCard, Navbar } from "../../components/common";
import { CircularProgress } from "@mui/material";
import styles from "./Home.module.scss";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch users
    // In a real application, this would be replaced with an actual API call
    const fetchUsers = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data
        const mockUsers = [
          { id: 1, username: "johndoe", email: "john.doe@example.com" },
          { id: 2, username: "janedoe", email: "jane.doe@example.com" },
          { id: 3, username: "bobsmith", email: "bob.smith@example.com" },
          { id: 4, username: "alicejones", email: "alice.jones@example.com" },
          { id: 5, username: "mikebrown", email: "mike.brown@example.com" },
          { id: 6, username: "sarahwilson", email: "sarah.wilson@example.com" },
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>System Users</h1>
        
        <div className={loading ? styles.contentLoading : ""}>
          <div className={styles.summary}>
            {users.length} {users.length === 1 ? 'user' : 'users'} found
          </div>
          
          {users.length > 0 ? (
            <div className={styles.grid}>
              {users.map(user => (
                <UserCard 
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  email={user.email}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>No users found in the system.</div>
          )}
        </div>
        
        {loading && (
          <div className={styles.loadingOverlay}>
            <CircularProgress 
              size={60}
              thickness={4}
              color="primary"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;