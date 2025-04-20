package com.demo.demoapi.adapter.outbound.persistence.UsersPersistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UsersJpaRepository extends JpaRepository<UsersPersistenceObject, UUID> {
    UsersPersistenceObject findByUsername(String username);
}
