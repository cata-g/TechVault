package com.techvault.platform.repository;

import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByCourseAuthorId(Long courseAuthorId);

    Course getCourseById(Long courseId);
}
