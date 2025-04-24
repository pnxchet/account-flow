package com.demo.demoapi.adapter.inbound.controller;

import com.demo.demoapi.adapter.inbound.communication.AuthRequest.AuthRequest;
import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.application.gateway.AuthGateway;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthGateway authGateway;

    @PostMapping("/login")
    public CommonResponse login(
            @RequestBody AuthRequest request,
            HttpServletResponse response
    ) {
        return authGateway.login(request, response);
    }

    @PostMapping("/signup")
    public CommonResponse signUp(
            @RequestBody AuthRequest request
    ) {
        return authGateway.signUp(request);
    }

    @PostMapping("/logout")
    public CommonResponse logout(
            HttpServletResponse response
    ) {
        return authGateway.logout(response);
    }
}