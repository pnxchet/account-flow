import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthStore from "../../../core/stores/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore()

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCreateUserClick = () => {
    navigate("/create-user");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button 
            className={styles.navButton} 
            onClick={handleHomeClick}
          >
            <HomeIcon className={styles.navIcon} />
            Home
          </button>
          <button 
            className={styles.navButton} 
            onClick={handleCreateUserClick}
          >
            <PersonIcon className={styles.navIcon} />
            Create User
          </button>
        </div>
        
        <div className={styles.right}>
          <button 
            className={styles.logoutLink} 
            onClick={handleLogout}
          >
            <LogoutIcon className={styles.navIcon} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;