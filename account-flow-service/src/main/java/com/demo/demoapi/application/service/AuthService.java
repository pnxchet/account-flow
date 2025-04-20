package com.demo.demoapi.application.service;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.outbound.persistence.usersPersistence.UserRepository;
import com.demo.demoapi.adapter.outbound.persistence.usersPersistence.UsersPersistenceObject;
import com.demo.demoapi.application.exception.ConditionErrorException;
import com.demo.demoapi.application.gateway.AuthGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthGateway {

    @Autowired
    private UserRepository userRepository;

    @Override
    public CommonResponse login(String username, String password) {
        UsersPersistenceObject user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ConditionErrorException("User not found");
        }

        if (!user.getPassword().equals(password)) {
            throw new ConditionErrorException("Invalid password");
        }

        if (!user.isActive()) {
            throw new ConditionErrorException("User is not active");
        }

        return null;
    }
}
