package com.mukesh.ClassroomAnnouncementManager.dto;

public class DeleteRequest {

    private Long userId;
    private String role;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
