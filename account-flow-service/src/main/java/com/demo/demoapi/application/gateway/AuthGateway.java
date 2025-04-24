package com.demo.demoapi.application.gateway;

import com.demo.demoapi.adapter.inbound.communication.AuthRequest.AuthRequest;
import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthGateway {
    CommonResponse login(AuthRequest request, HttpServletResponse response);

    CommonResponse signUp(AuthRequest request);

    CommonResponse logout(HttpServletResponse response);
}
