package com.demo.demoapi.application.gateway;

import com.demo.demoapi.adapter.inbound.communication.CommonResponse;

public interface AuthGateway {
    CommonResponse login(String username, String password);
}
