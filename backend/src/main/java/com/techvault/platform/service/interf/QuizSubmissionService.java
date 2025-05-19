package com.techvault.platform.service.interf;

import com.techvault.platform.model.QuizSubmission;

import java.util.List;
import java.util.Optional;

public interface QuizSubmissionService {
    QuizSubmission submitQuiz(QuizSubmission submission);
    Optional<QuizSubmission> getSubmissionById(Long id);
    List<QuizSubmission> getAllSubmissions();
    void deleteSubmission(Long id);
}
