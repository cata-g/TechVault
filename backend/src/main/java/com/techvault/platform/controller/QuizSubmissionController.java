package com.techvault.platform.controller;

import com.techvault.platform.model.QuizSubmission;
import com.techvault.platform.service.interf.QuizSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/submissions/quizzes")
public class QuizSubmissionController {

    @Autowired
    private QuizSubmissionService submissionService;

    @PostMapping
    public ResponseEntity<QuizSubmission> submit(@RequestBody QuizSubmission submission) {
        return ResponseEntity.ok(submissionService.submitQuiz(submission));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<QuizSubmission>> getSubmission(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @GetMapping
    public ResponseEntity<List<QuizSubmission>> getAllSubmissions() {
        return ResponseEntity.ok(submissionService.getAllSubmissions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable Long id) {
        submissionService.deleteSubmission(id);
        return ResponseEntity.ok().build();
    }
}
