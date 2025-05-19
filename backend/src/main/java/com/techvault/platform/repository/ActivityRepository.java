package com.techvault.platform.repository;

import com.techvault.platform.model.Activity;
import com.techvault.platform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    public List<Activity> findAllByCourse(Course course);
}
