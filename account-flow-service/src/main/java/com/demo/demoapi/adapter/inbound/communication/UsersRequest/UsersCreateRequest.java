package com.demo.demoapi.adapter.inbound.communication.UsersRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersCreateRequest {
    private String username;
    private String email;
    private String password;
}
