-- V2__Create_user_credentials_table.sql
CREATE TABLE IF NOT EXISTS demo.user_credentials (
      username VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      salt VARCHAR(128),
      last_password_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);