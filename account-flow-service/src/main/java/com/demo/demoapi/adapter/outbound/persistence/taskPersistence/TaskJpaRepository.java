package com.demo.demoapi.adapter.outbound.persistence.taskPersistence;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface TaskJpaRepository extends JpaRepository<TaskPersistenceObject, UUID> {

    @Transactional
    @Modifying
    @Query("UPDATE TaskPersistenceObject t SET t.isCompleted = :isCompleted, t.completedAt = :completedAt WHERE t.id = :id")
    void updateTaskStatus(
            @Param("id") UUID id,
            @Param("isCompleted") Boolean isCompleted,
            @Param("completedAt") LocalDateTime completedAt
    );
}
