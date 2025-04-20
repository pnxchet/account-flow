package com.demo.demoapi.adapter.inbound.controller;

import com.demo.demoapi.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        if (isValidUser(loginRequest.getUsername(), loginRequest.getPassword())) {
            String jwt = jwtUtil.generateToken(loginRequest.getUsername());

            Cookie cookie = new Cookie("jwt", jwt);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60);
            response.addCookie(cookie);

            return ResponseEntity.ok(new AuthResponse(jwt, "Login successful"));
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // ลบ cookie เพื่อ logout
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // หมดอายุทันที
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }

    // ตัวอย่างการตรวจสอบผู้ใช้งาน (ระบบจริงควรตรวจสอบกับฐานข้อมูล)
    private boolean isValidUser(String username, String password) {
        // ตัวอย่างเท่านั้น ในระบบจริงควรตรวจสอบกับฐานข้อมูล
        // return userRepository.findByUsername(username)
        //        .map(user -> passwordEncoder.matches(password, user.getPassword()))
        //        .orElse(false);

        // ตัวอย่างง่ายๆ เพื่อการทดสอบ
        return "admin".equals(username) && "password".equals(password);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private String message;
    }
}