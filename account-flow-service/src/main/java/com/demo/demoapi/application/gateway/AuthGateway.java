package com.demo.demoapi.application.gateway;

import com.demo.demoapi.adapter.inbound.communication.AuthRequest.LoginRequest;
import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthGateway {
    CommonResponse login(LoginRequest request, HttpServletResponse response);
}
