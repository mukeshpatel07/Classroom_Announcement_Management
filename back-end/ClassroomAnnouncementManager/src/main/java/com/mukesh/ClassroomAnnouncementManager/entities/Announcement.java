package com.mukesh.ClassroomAnnouncementManager.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // Optional: Apply globally
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;  // Homework or Event

    private String title;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("content")
    private String description;

    private LocalDate dueDate;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ✅ This line fixes the JSON issue
    private User teacher;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }
}
