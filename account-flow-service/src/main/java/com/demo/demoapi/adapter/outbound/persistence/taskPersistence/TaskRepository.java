package com.demo.demoapi.adapter.outbound.persistence.taskPersistence;

import com.demo.demoapi.application.exception.DatabaseErrorException;
import com.demo.demoapi.util.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public class TaskRepository {
    @Autowired
    private TaskJpaRepository taskJpaRepository;
    private static final Logger Logger = LoggerFactory.getLogger(TaskRepository.class);

    public List<TaskPersistenceObject> getTasks() {
        try {
            return taskJpaRepository.findAll();
        } catch (Exception e) {
            Logger.error("get tasks error", e);
            throw new DatabaseErrorException(Constant.DATABASE_ERROR);
        }
    }

    public void createTask(TaskPersistenceObject task) {
        try {
            taskJpaRepository.save(task);
        } catch (Exception e) {
            Logger.error("create task error", e);
            throw new DatabaseErrorException(Constant.DATABASE_ERROR);
        }
    }

    public void updateTaskStatus(UUID id, Boolean isCompleted, LocalDateTime completedAt) {
        try {
            taskJpaRepository.updateTaskStatus(id, isCompleted, completedAt);
        } catch (Exception e) {
            Logger.error("update task status error", e);
            throw new DatabaseErrorException(Constant.DATABASE_ERROR);
        }
    }

    public void deleteTask(UUID id) {
        try {
            taskJpaRepository.deleteById(id);
        } catch (Exception e) {
            Logger.error("delete task error", e);
            throw new DatabaseErrorException(Constant.DATABASE_ERROR);
        }
    }
}
