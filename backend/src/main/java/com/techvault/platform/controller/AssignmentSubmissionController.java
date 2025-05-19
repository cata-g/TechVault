package com.techvault.platform.controller;

import com.techvault.platform.model.AssignmentSubmission;
import com.techvault.platform.service.interf.AssignmentSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/submissions/assignments")
public class AssignmentSubmissionController {

    @Autowired
    private AssignmentSubmissionService submissionService;

    @PostMapping
    public ResponseEntity<AssignmentSubmission> submit(@RequestBody AssignmentSubmission submission) {
        return ResponseEntity.ok(submissionService.submitAssignment(submission));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AssignmentSubmission>> getSubmission(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssignmentSubmission>> getAllSubmissions() {
        return ResponseEntity.ok(submissionService.getAllSubmissions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable Long id) {
        submissionService.deleteSubmission(id);
        return ResponseEntity.ok().build();
    }
}
