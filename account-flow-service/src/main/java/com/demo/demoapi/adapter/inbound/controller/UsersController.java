package com.demo.demoapi.adapter.inbound.controller;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersCreateRequest;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersUpdateRequest;
import com.demo.demoapi.application.gateway.UsersGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersGateway usersGateway;

    @GetMapping()
    public CommonResponse getUsers() {
        return usersGateway.getAllUsers();
    }

    @GetMapping("/{userId}")
    public CommonResponse getUserDetail(
            @PathVariable String userId
    ) {
        return usersGateway.getUserById(userId);
    }

    @PostMapping()
    public CommonResponse createUser(
            @RequestBody UsersCreateRequest request
    ) {
        return usersGateway.createUser(request);
    }

    @PutMapping("/{userId}")
    public CommonResponse updateTaskStatus(
            @PathVariable String userId,
            @RequestBody UsersUpdateRequest request
            ) {
        return usersGateway.updateUser(userId, request);
    }

    @DeleteMapping("/{userId}")
    public CommonResponse deleteTask(
            @PathVariable String userId
    ) {
        return usersGateway.deleteUser(userId);
    }
}
