package com.techvault.platform.service.impl;

import com.techvault.platform.model.Badge;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import com.techvault.platform.repository.CourseRepository;
import com.techvault.platform.repository.UserRepository;
import com.techvault.platform.service.interf.UserDetailsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getEnrolledCourses(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getEnrolledCourses();
    }

    @Override
    public void enrollCourse(Course course, Long userId) {
        User user = userRepository.findById(userId).get();
        List<Course> enrolledCourses = user.getEnrolledCourses();
        enrolledCourses.add(course);
        user.setEnrolledCourses(enrolledCourses);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void unenrollCourse(Course course, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        course = courseRepository.findById(course.getId()).orElseThrow();

        user.getEnrolledCourses().remove(course);

        userRepository.save(user);
        courseRepository.save(course);
    }

    @Override
    public List<Badge> getBadgesOfUser(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getEarnedBadges();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean isEnrolledInCourse(Long courseId, Long userId) {
        List<Course> enrolledCourses = getEnrolledCourses(userId);
        for (Course course : enrolledCourses) {
            if (course.getId().equals(courseId)) {
                return true;
            }
        }
        return false;
    }
}
