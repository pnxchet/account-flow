import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "..";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Here you would implement your logout logic
    console.log("Logging out...");
    
    // After logout, navigate to login page
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button 
            className={styles.homeButton} 
            onClick={handleHomeClick}
          >
            <i className={styles.homeIcon}>🏠</i>
            Home
          </button>
        </div>
        
        <div className={styles.right}>
          <Button 
            variant="danger" 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;