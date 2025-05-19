package com.techvault.platform.service.interf;

import com.techvault.platform.model.Activity;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course createCourse(Course course);
    Course updateCourse(Long id, Course updatedCourse);
    void deleteCourse(Long id);
    List<Course> getAllCourses();
    Optional<Course> getCourseById(Long id);
    @Query("SELECT c FROM Course c WHERE c.courseAuthor.id = :authorId")
    List<Course> getCoursesByAuthor(@Param("authorId") Long authorId);
    List<Activity> getActivitiesByCourseId(Long courseId);
}
