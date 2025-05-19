package com.techvault.platform.repository;

import com.techvault.platform.model.QuizSubmission;
import com.techvault.platform.model.Quiz;
import com.techvault.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    Optional<QuizSubmission> findByQuizAndUser(Quiz quiz, User user);
    List<QuizSubmission> findByUser(User user);
}
