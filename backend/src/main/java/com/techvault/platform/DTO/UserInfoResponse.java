package com.techvault.platform.DTO;

import com.techvault.platform.model.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
    private Long id;
    private String username;
    private UserRole role;
    private Integer points;

    public UserInfoResponse(Long id, String username, UserRole role, Integer points) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.points = points;
    }
}
