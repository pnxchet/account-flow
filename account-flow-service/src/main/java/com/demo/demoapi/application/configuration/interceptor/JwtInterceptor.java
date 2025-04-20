package com.demo.demoapi.application.configuration.interceptor;

import com.demo.demoapi.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.Optional;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // ดึง JWT จาก cookie
        String jwt = null;
        if (request.getCookies() != null) {
            Optional<Cookie> jwtCookie = Arrays.stream(request.getCookies())
                    .filter(cookie -> "jwt".equals(cookie.getName()))
                    .findFirst();

            if (jwtCookie.isPresent()) {
                jwt = jwtCookie.get().getValue();
            }
        }

        // ถ้าไม่มี token หรือ token ไม่ถูกต้อง
        if (jwt == null || !jwtUtil.validateToken(jwt)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Unauthorized: Invalid or missing JWT token");
            return false;
        }

        // อาจเพิ่มข้อมูลของผู้ใช้ใน request attributes เพื่อใช้ในส่วนอื่นๆ
        String username = jwtUtil.extractUsername(jwt);
        request.setAttribute("username", username);

        return true;
    }
}