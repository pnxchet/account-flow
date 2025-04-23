package com.demo.demoapi.adapter.outbound.persistence.UserCredentialPersistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialJpaRepository extends JpaRepository<UserCredentialPersistenceObject, String> {
    UserCredentialPersistenceObject findByUsername(String username);
}
