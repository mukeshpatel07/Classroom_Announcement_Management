package com.mukesh.ClassroomAnnouncementManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.mukesh.ClassroomAnnouncementManager.entities")
public class ClassroomAnnouncementManagerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ClassroomAnnouncementManagerApplication.class, args);
	}
}

