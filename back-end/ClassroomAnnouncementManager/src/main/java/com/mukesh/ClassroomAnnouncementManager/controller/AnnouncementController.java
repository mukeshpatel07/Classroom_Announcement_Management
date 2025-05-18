package com.mukesh.ClassroomAnnouncementManager.controller;

import com.mukesh.ClassroomAnnouncementManager.entities.Announcement;
import com.mukesh.ClassroomAnnouncementManager.entities.User;
import com.mukesh.ClassroomAnnouncementManager.repositories.AnnouncementRepository;
import com.mukesh.ClassroomAnnouncementManager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepo;

    @Autowired
    private UserRepository userRepo;

    // Get all announcements (accessible to any authenticated user)
    @GetMapping
    public List<Announcement> getAll() {
        return announcementRepo.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public Announcement create(@RequestBody Announcement ann) {
        User user = getAuthenticatedUser();

        if (!"TEACHER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Only teachers can create announcements");
        }

        ann.setCreatedAt(LocalDateTime.now());
        ann.setTeacher(user);
        return announcementRepo.save(ann);
    }


    // Update announcement (only by creator teacher)
    @PutMapping("/{id}")
    public Announcement update(@PathVariable Long id, @RequestBody Announcement updatedAnn) {
        User user = getAuthenticatedUser();

        Announcement existing = announcementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        if (!"TEACHER".equalsIgnoreCase(user.getRole()) ||
                !existing.getTeacher().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to update this announcement");
        }

        existing.setCategory(updatedAnn.getCategory());
        existing.setTitle(updatedAnn.getTitle());
        existing.setDescription(updatedAnn.getDescription());
        existing.setDueDate(updatedAnn.getDueDate());

        return announcementRepo.save(existing);
    }

    // Student-only endpoint for announcements (optional)
    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Announcement>> getStudentAnnouncements() {
        // You can add more filtering logic if needed (e.g., by date or tag)
        List<Announcement> announcements = announcementRepo.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(announcements);
    }

    // Delete announcement (only by creator teacher)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        User user = getAuthenticatedUser();

        Announcement announcement = announcementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));

        if (!"TEACHER".equalsIgnoreCase(user.getRole()) ||
                !announcement.getTeacher().getId().equals(user.getId())) {
            return "Not allowed to delete this announcement";
        }

        announcementRepo.deleteById(id);
        return "Announcement deleted";
    }

    // Utility: Fetch currently logged-in user based on JWT email
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            throw new RuntimeException("Authenticated user not found");
        }

        String email = authentication.getName(); // This should be the user's email (subject in JWT)

        return userRepo.findByEmailId(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
