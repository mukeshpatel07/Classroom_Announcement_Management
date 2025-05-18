package com.mukesh.ClassroomAnnouncementManager.repositories;

import com.mukesh.ClassroomAnnouncementManager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailId(String emailId);
}
