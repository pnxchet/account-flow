package com.demo.demoapi.application.exception;

public class ConditionErrorException extends RuntimeException {
    public ConditionErrorException(String message) {
        super(message);
    }
}
