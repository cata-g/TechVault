package com.techvault.platform.repository;

import com.techvault.platform.model.Badge;
import com.techvault.platform.model.Course;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {
    User findById(long id);
}
