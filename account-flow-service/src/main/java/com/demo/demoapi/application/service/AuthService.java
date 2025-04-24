package com.demo.demoapi.application.service;

import com.demo.demoapi.adapter.inbound.communication.AuthRequest.AuthRequest;
import com.demo.demoapi.adapter.inbound.communication.CommonResponse;
import com.demo.demoapi.adapter.outbound.persistence.UserCredentialPersistence.UserCredentialPersistenceObject;
import com.demo.demoapi.adapter.outbound.persistence.UserCredentialPersistence.UserCredentialRepository;
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
    private UserCredentialRepository userCredentialRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public CommonResponse login(AuthRequest request, HttpServletResponse response) {
        String username = request.getUsername();
        String password = request.getPassword();
        UserCredentialPersistenceObject user = userCredentialRepository.findByUsername(username);
        if (user == null) {
            throw new ConditionErrorException("Username or password is incorrect");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ConditionErrorException("Username or password is incorrect");
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

    @Override
    public CommonResponse signUp(AuthRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        UserCredentialPersistenceObject existingUser = userCredentialRepository.findByUsername(username);
        if (existingUser != null) {
            throw new ConditionErrorException("User already exists");
        }

        UserCredentialPersistenceObject newUser = new UserCredentialPersistenceObject();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        userCredentialRepository.save(newUser);

        return new CommonResponse(
                String.valueOf(HttpStatus.CREATED.value()),
                "Sign up successful",
                null
        );
    }

    @Override
    public CommonResponse logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return new CommonResponse(
                String.valueOf(HttpStatus.OK.value()),
                "Logout successful",
                null
        );
    }
}
