package com.techvault.platform.service.interf;

import com.techvault.platform.model.AssignmentSubmission;

import java.util.List;
import java.util.Optional;

public interface AssignmentSubmissionService {
    AssignmentSubmission submitAssignment(AssignmentSubmission submission);
    Optional<AssignmentSubmission> getSubmissionById(Long id);
    List<AssignmentSubmission> getAllSubmissions();
    void deleteSubmission(Long id);
}
