package com.techvault.platform.repository;

import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findAllByEnrolledCoursesContains(Course course);
}