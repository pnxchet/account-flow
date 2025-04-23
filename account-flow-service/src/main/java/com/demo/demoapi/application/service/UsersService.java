package com.demo.demoapi.application.service;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersCreateRequest;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersUpdateRequest;
import com.demo.demoapi.adapter.outbound.persistence.UsersPersistence.UsersRepository;
import com.demo.demoapi.adapter.outbound.persistence.UsersPersistence.UsersPersistenceObject;
import com.demo.demoapi.application.exception.ConditionErrorException;
import com.demo.demoapi.application.gateway.UsersGateway;
import com.demo.demoapi.util.Constant;
import com.demo.demoapi.util.ConvertUtil;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService implements UsersGateway {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public CommonResponse getAllUsers() {
        return new CommonResponse(String.valueOf(HttpStatus.OK.value()), Constant.SUCCESS, usersRepository.findAll());
    }

    @Override
    public CommonResponse getUserById(String id) {
        Optional<UsersPersistenceObject> user = usersRepository.findById(ConvertUtil.convertStringToUUID(id));
        if (user.isEmpty()) {
            return new CommonResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), Constant.USER_NOT_FOUND, null);
        }
        return new CommonResponse(String.valueOf(HttpStatus.OK.value()), Constant.SUCCESS, user);
    }

    @Override
    public CommonResponse createUser(UsersCreateRequest request) {
        UUID id = UUID.randomUUID();
        LocalDateTime createdAt = LocalDateTime.now();
        boolean isActive = true;
        UsersPersistenceObject user = new UsersPersistenceObject(
                id,
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getName(),
                isActive,
                createdAt
        );
        UsersPersistenceObject resultUser = usersRepository.save(user);
        return new CommonResponse(String.valueOf(HttpStatus.CREATED.value()), Constant.SUCCESS, resultUser);
    }

    @Override
    public CommonResponse updateUser(String id, UsersUpdateRequest request) {
        UsersPersistenceObject existingUser = usersRepository.findById(ConvertUtil.convertStringToUUID(id))
                .orElseThrow(() -> new ConditionErrorException(Constant.USER_NOT_FOUND));

        existingUser.setEmail(request.getEmail());
        existingUser.setName(request.getName());
        existingUser.setActive(request.getIsActive());

        UsersPersistenceObject updatedUser = usersRepository.save(existingUser);
        return new CommonResponse(String.valueOf(HttpStatus.ACCEPTED.value()), Constant.SUCCESS, updatedUser);
    }

    @Override
    public CommonResponse deleteUser(String id) {
        usersRepository.deleteById(ConvertUtil.convertStringToUUID(id));
        return new CommonResponse(String.valueOf(HttpStatus.OK.value()), Constant.SUCCESS, null);
    }
}
