package com.demo.demoapi.adapter.outbound.persistence.UsersPersistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "users", schema = "demo")
@NoArgsConstructor
@AllArgsConstructor
public class UsersPersistenceObject {
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
