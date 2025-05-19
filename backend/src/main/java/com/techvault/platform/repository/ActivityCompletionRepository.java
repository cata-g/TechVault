package com.techvault.platform.repository;

import com.techvault.platform.model.ActivityCompletion;
import com.techvault.platform.model.Activity;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityCompletionRepository extends JpaRepository<ActivityCompletion, Long> {
    List<ActivityCompletion> findByUser(User user);
    Optional<ActivityCompletion> findByUserAndActivity(User user, Activity activity);
}
