import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./UserCard.module.scss";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/user/${user.id}`);
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.field}>
        <span className={styles.label}>ID:</span>
        <span className={styles.value}>{user.id}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Username:</span>
        <span className={styles.value}>{user.username}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Email:</span>
        <span className={styles.value}>{user.email}</span>
      </div>
      <div className={styles.actions}>
        <Button 
          variant="primary" 
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default UserCard;