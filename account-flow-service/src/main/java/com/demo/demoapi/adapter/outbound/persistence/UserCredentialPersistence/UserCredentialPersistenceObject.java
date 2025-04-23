package com.demo.demoapi.adapter.outbound.persistence.UserCredentialPersistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "user_credentials", schema = "demo")
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentialPersistenceObject {
    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
}
