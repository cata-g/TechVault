package com.techvault.platform.service.impl;

import com.techvault.platform.model.Activity;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import com.techvault.platform.repository.ActivityRepository;
import com.techvault.platform.repository.CourseRepository;
import com.techvault.platform.repository.UserRepository;
import com.techvault.platform.service.interf.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityRepository activityRepository;

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course updatedCourse) {
        if (!courseRepository.existsById(id)) return null;
        updatedCourse.setId(id);
        return courseRepository.save(updatedCourse);
    }

    @Override
    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow();

        List<Activity> activities = activityRepository.findAllByCourse(course);
        activityRepository.deleteAll(activities);
        // Remove this course from all users who have it enrolled
        List<User> users = userRepository.findAllByEnrolledCoursesContains(course);
        for (User user : users) {
            user.getEnrolledCourses().remove(course);
            userRepository.save(user);
        }

        // Now delete the course
        courseRepository.delete(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    @Override
    public List<Course> getCoursesByAuthor(Long authorId) {
        return courseRepository.findAllByCourseAuthorId(authorId);
    }

    @Override
    public List<Activity> getActivitiesByCourseId(Long courseId) {
        Course course = courseRepository.getCourseById(courseId);
        return course.getActivities();
    }


}
