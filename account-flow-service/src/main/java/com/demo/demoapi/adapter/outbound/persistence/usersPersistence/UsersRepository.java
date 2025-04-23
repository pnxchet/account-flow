package com.demo.demoapi.adapter.outbound.persistence.UsersPersistence;

import com.demo.demoapi.application.exception.DatabaseErrorException;
import com.demo.demoapi.util.ConvertUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UsersRepository {
    @Autowired
    private UsersJpaRepository usersJpaRepository;
    private static final Logger Logger = LoggerFactory.getLogger(UsersRepository.class);

    public List<UsersPersistenceObject> findAll() {
        try {
            return usersJpaRepository.findAll();
        } catch (Exception e) {
            Logger.error("Error finding all users: {}", e.getMessage());
            throw new DatabaseErrorException("Error finding all users: " + e.getMessage());
        }
    }

    public UsersPersistenceObject findByUsername(String username) {
        try {
            return usersJpaRepository.findByUsername(username);
        } catch (Exception e) {
            Logger.error("Error finding user by username: {}, Error: {}", username, e.getMessage());
            throw new DatabaseErrorException("Error finding user by username: " + username + ", Error: " + e.getMessage());
        }
    }

    public Optional<UsersPersistenceObject> findById(UUID id) {
        try {
            return usersJpaRepository.findById(id);
        } catch (Exception e) {
            Logger.error("Error finding user by id: {}, Error: {}", id, e.getMessage());
            throw new DatabaseErrorException("Error finding user by id: " + id + ", Error: " + e.getMessage());
        }
    }

    public UsersPersistenceObject save(UsersPersistenceObject user) {
        try {
            return usersJpaRepository.save(user);
        } catch (Exception e) {
            Logger.error("Error saving user: {}, Error: {}", user, e.getMessage());
            throw new DatabaseErrorException("Error saving user: " + user + ", Error: " + e.getMessage());
        }
    }

    public void deleteById(UUID id) {
        try {
            usersJpaRepository.deleteById(id);
        } catch (Exception e) {
            Logger.error("Error deleting user by id: {}, Error: {}", id, e.getMessage());
            throw new DatabaseErrorException("Error deleting user by id: " + id + ", Error: " + e.getMessage());
        }
    }
}
