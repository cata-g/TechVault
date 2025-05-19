package com.techvault.platform.service.impl;

import com.techvault.platform.model.QuizSubmission;
import com.techvault.platform.repository.QuizSubmissionRepository;
import com.techvault.platform.service.interf.QuizSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizSubmissionServiceImpl implements QuizSubmissionService {

    @Autowired
    private QuizSubmissionRepository quizSubmissionRepository;

    @Override
    public QuizSubmission submitQuiz(QuizSubmission submission) {
        return quizSubmissionRepository.save(submission);
    }

    @Override
    public Optional<QuizSubmission> getSubmissionById(Long id) {
        return quizSubmissionRepository.findById(id);
    }

    @Override
    public List<QuizSubmission> getAllSubmissions() {
        return quizSubmissionRepository.findAll();
    }

    @Override
    public void deleteSubmission(Long id) {
        quizSubmissionRepository.deleteById(id);
    }
}
