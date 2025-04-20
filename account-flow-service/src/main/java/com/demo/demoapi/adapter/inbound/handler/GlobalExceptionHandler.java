package com.demo.demoapi.adapter.inbound.handler;

import com.demo.demoapi.adapter.inbound.communication.ErrorResponse;
import com.demo.demoapi.application.exception.BadRequestException;
import com.demo.demoapi.application.exception.ConditionErrorException;
import com.demo.demoapi.application.exception.DatabaseErrorException;
import com.demo.demoapi.util.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConditionErrorException.class)
    public ResponseEntity<ErrorResponse> handleConditionErrorException(ConditionErrorException ex) {
        ErrorResponse response = new ErrorResponse(Constant.CONDITION_ERROR, ex.getMessage());
        return new ResponseEntity<>(
                response, HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(DatabaseErrorException.class)
    public ResponseEntity<ErrorResponse> handleDatabaseErrorException(DatabaseErrorException ex) {
        ErrorResponse response = new ErrorResponse(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()), ex.getMessage());
        return new ResponseEntity<>(
                response, HttpStatus.SERVICE_UNAVAILABLE
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex) {
        ErrorResponse response = new ErrorResponse(String.valueOf(HttpStatus.BAD_REQUEST.value()), ex.getMessage());
        return new ResponseEntity<>(
                response, HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex) {
        ErrorResponse response = new ErrorResponse(
                String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()),
                "An unexpected error occurred"
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}