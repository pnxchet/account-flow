package com.demo.demoapi.adapter.outbound.persistence.UserCredentialPersistence;

import com.demo.demoapi.adapter.outbound.persistence.UsersPersistence.UsersRepository;
import com.demo.demoapi.application.exception.DatabaseErrorException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserCredentialRepository {

    @Autowired
    private UserCredentialJpaRepository userCredentialJpaRepositort;
    private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(UserCredentialRepository.class);

    public UserCredentialPersistenceObject findByUsername(String username) {
        try {
            return userCredentialJpaRepositort.findByUsername(username);
        } catch (Exception e) {
            Logger.error("Error finding user by username: {}, Error: {}", username, e.getMessage());
            throw new DatabaseErrorException("Error finding user by username: " + username + ", Error: " + e.getMessage());
        }
    }

    public void save(UserCredentialPersistenceObject userCredential) {
        try {
            userCredentialJpaRepositort.save(userCredential);
        } catch (Exception e) {
            Logger.error("Error saving user credential: {}, Error: {}", userCredential, e.getMessage());
            throw new DatabaseErrorException("Error saving user credential: " + userCredential + ", Error: " + e.getMessage());
        }
    }
}
