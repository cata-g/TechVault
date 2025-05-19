package com.techvault.platform.controller;

import com.techvault.platform.model.ActivityCompletion;
import com.techvault.platform.service.interf.ActivityCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/completions")
public class ActivityCompletionController {

    @Autowired
    private ActivityCompletionService activityCompletionService;

    @PostMapping
    public ResponseEntity<ActivityCompletion> createCompletion(@RequestBody ActivityCompletion completion) {
        return ResponseEntity.ok(activityCompletionService.markCompleted(completion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ActivityCompletion>> getCompletion(@PathVariable Long id) {
        return ResponseEntity.ok(activityCompletionService.getActivityCompletionById(id));
    }

    @GetMapping
    public ResponseEntity<List<ActivityCompletion>> getAllCompletions() {
        return ResponseEntity.ok(activityCompletionService.getAllActivityCompletions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompletion(@PathVariable Long id) {
        activityCompletionService.deleteActivityCompletionById(id);
        return ResponseEntity.ok().build();
    }
}
