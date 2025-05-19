package com.techvault.platform.controller;

import com.techvault.platform.model.Badge;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import com.techvault.platform.service.impl.UserDetailsImpl;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userDetails")
public class UserDetailsController {

    @Autowired
    private UserDetailsImpl userDetailsService;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userDetailsService.getAllUsers();
    }

    // Get enrolled courses for a user
    @GetMapping("/{userId}/courses")
    public List<Course> getEnrolledCourses(@PathVariable Long userId) {
        return userDetailsService.getEnrolledCourses(userId);
    }

    // Enroll a user in a course
    @PostMapping("/{userId}/courses")
    public ResponseEntity<?> enrollCourse(@RequestBody Course course, @PathVariable Long userId) {
        userDetailsService.enrollCourse(course, userId);
        return ResponseEntity.ok(Response.SC_OK);
    }

    // Unenroll a user from a course
    @DeleteMapping("/{userId}/courses")
    public ResponseEntity<?> unenrollCourse(@RequestBody Course course, @PathVariable Long userId) {
        userDetailsService.unenrollCourse(course, userId);
        return ResponseEntity.ok(Response.SC_OK);
    }

    // Get badges of a user
    @GetMapping("/{userId}/badges")
    public List<Badge> getBadgesOfUser(@PathVariable Long userId) {
        return userDetailsService.getBadgesOfUser(userId);
    }

    @GetMapping("/{userId}/isEnrolledTo/{courseId}/")
    public boolean isEnrolledToCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        System.out.println("Aici");
        return userDetailsService.isEnrolledInCourse(courseId, userId);
    }
}
