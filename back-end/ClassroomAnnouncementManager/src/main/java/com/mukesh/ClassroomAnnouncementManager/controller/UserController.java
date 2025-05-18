package com.mukesh.ClassroomAnnouncementManager.controller;

import com.mukesh.ClassroomAnnouncementManager.config.JwtUtil;
import com.mukesh.ClassroomAnnouncementManager.entities.User;
import com.mukesh.ClassroomAnnouncementManager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend access
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> userMap) {
        String fullName = (String) userMap.get("fullName");
        String role = (String) userMap.get("role");
        String emailId = (String) userMap.get("emailId");
        String password = (String) userMap.get("password");

        if (userRepository.findByEmailId(emailId).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User newUser = new User(fullName, role, emailId, password);
        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");
    }

    // ✅ LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginMap) {
        String emailId = loginMap.get("emailId");
        String password = loginMap.get("password");

        Optional<User> userOpt = userRepository.findByEmailId(emailId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(emailId, user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("fullName", user.getName());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }


}
