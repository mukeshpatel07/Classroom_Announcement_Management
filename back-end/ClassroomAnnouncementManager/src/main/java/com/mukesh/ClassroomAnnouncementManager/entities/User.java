package com.mukesh.ClassroomAnnouncementManager.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // ✅ Added this line
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String fullName;

    @Setter
    private String role;

    @Setter
    @Column(unique = true)
    private String emailId;

    @Setter
    private String password;

    public User() {}

    public User(String fullName, String role, String emailId, String password) {
        this.fullName = fullName;
        this.role = role;
        this.emailId = emailId;
        this.password = password;
    }

    public Object getName() {
        return fullName;
    }
}
