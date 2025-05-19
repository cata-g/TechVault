package com.techvault.platform.service.impl;

import com.techvault.platform.model.AssignmentSubmission;
import com.techvault.platform.repository.AssignmentSubmissionRepository;
import com.techvault.platform.service.interf.AssignmentSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentSubmissionServiceImpl implements AssignmentSubmissionService {

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Override
    public AssignmentSubmission submitAssignment(AssignmentSubmission submission) {
        return assignmentSubmissionRepository.save(submission);
    }

    @Override
    public Optional<AssignmentSubmission> getSubmissionById(Long id) {
        return assignmentSubmissionRepository.findById(id);
    }

    @Override
    public List<AssignmentSubmission> getAllSubmissions() {
        return assignmentSubmissionRepository.findAll();
    }

    @Override
    public void deleteSubmission(Long id) {
        assignmentSubmissionRepository.deleteById(id);
    }
}
