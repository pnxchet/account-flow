package com.demo.demoapi.adapter.outbound.persistence.UsersPersistence;

import com.demo.demoapi.application.exception.DatabaseErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private UsersJpaRepository usersJpaRepository;
    private static final Logger Logger = LoggerFactory.getLogger(UserRepository.class);

    public UsersPersistenceObject findByUsername(String username) {
        try {
            return usersJpaRepository.findByUsername(username);
        } catch (Exception e) {
            Logger.error("Error finding user by username: {}, Error: {}", username, e.getMessage());
            throw new DatabaseErrorException("Error finding user by username: " + username + ", Error: " + e.getMessage());
        }
    }
}
