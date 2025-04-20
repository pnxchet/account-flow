package com.demo.demoapi.adapter.inbound.controller;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.inbound.communication.UsersRequest.UsersCreateRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UsersController {

    @GetMapping()
    public CommonResponse getUsers() {
        return null;
    }

    @GetMapping("/{userId}")
    public CommonResponse getUserDetail(
            @PathVariable String userId
    ) {
        return null;
    }

    @PostMapping()
    public CommonResponse createUser(
            @RequestBody UsersCreateRequest request
    ) {
        return null;
    }

    @PutMapping("/{userId}")
    public CommonResponse updateTaskStatus(
            @PathVariable String userId
            ) {
        return null;
    }

    @DeleteMapping("/{userId}")
    public CommonResponse deleteTask(
            @PathVariable String userId
    ) {
        return null;
    }
}
