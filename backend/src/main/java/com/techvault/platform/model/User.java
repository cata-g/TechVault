package com.techvault.platform.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "techvault_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    private int totalPoints = 0;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Course> enrolledCourses = new ArrayList<>();

    @ManyToMany
    private List<Badge> earnedBadges = new ArrayList<>();

    @OneToMany
    private List<ActivityCompletion> completedActivities = new ArrayList<>();

    @OneToMany
    private List<QuizSubmission> quizSubmissions = new ArrayList<>();

    @OneToMany
    private List<AssignmentSubmission> assignmentSubmissions = new ArrayList<>();

    @OneToMany
    private List<Comment> comments = new ArrayList<>();

    public User(String username, String password, UserRole role) {
        this.username = username;
        this.password = password;
        this.role = role != null ? role : UserRole.STUDENT;
        this.totalPoints = 0;
        this.enrolledCourses = new ArrayList<>();
        this.earnedBadges = new ArrayList<>();
        this.completedActivities = new ArrayList<>();
        this.quizSubmissions = new ArrayList<>();
        this.assignmentSubmissions = new ArrayList<>();
        this.comments = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + "'}";  // no collections here
    }

}
