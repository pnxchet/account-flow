package com.demo.demoapi.application.service;

import com.demo.demoapi.adapter.inbound.communication.AuthRequest.LoginRequest;
import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.outbound.persistence.UsersPersistence.UsersRepository;
import com.demo.demoapi.adapter.outbound.persistence.UsersPersistence.UsersPersistenceObject;
import com.demo.demoapi.application.exception.ConditionErrorException;
import com.demo.demoapi.application.gateway.AuthGateway;
import com.demo.demoapi.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthGateway {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public CommonResponse login(LoginRequest request, HttpServletResponse response) {
        String username = request.getUsername();
        String password = request.getPassword();
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

        String jwt = jwtUtil.generateToken(username);
        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);
        response.addCookie(cookie);

        return new CommonResponse(
                String.valueOf(HttpStatus.OK.value()),
                "Login successful",
                null
        );
    }
}
