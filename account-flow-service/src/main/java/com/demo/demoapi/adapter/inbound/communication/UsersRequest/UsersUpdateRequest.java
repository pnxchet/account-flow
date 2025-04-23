package com.demo.demoapi.adapter.inbound.communication.UsersRequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersUpdateRequest {

    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("isActive")
    private boolean isActive;

    public boolean getIsActive() {
        return this.isActive;
    }
}
