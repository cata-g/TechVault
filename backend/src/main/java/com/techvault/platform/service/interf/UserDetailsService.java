package com.techvault.platform.service.interf;

import com.techvault.platform.model.Badge;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;

import java.util.List;

public interface UserDetailsService {
    List<Course> getEnrolledCourses(Long userId);
    void enrollCourse(Course course, Long userId);
    void unenrollCourse(Course course, Long userId);
    List<Badge> getBadgesOfUser(Long userId);
    List<User> getAllUsers();
    boolean isEnrolledInCourse(Long courseId, Long userId);
}
