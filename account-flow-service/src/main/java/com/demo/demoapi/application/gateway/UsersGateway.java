package com.demo.demoapi.application.gateway;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersCreateRequest;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersUpdateRequest;

public interface UsersGateway {
    CommonResponse getAllUsers();

    CommonResponse getUserById(String id);

    CommonResponse createUser(UsersCreateRequest request);

    CommonResponse updateUser(String id, UsersUpdateRequest request);

    CommonResponse deleteUser(String id);
}
