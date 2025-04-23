-- V1__Create_users_table.sql
CREATE SCHEMA IF NOT EXISTS demo;

CREATE TABLE IF NOT EXISTS demo.users(
    id         UUID PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL,
    name       VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);