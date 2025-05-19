package com.techvault.platform.service.interf;

import com.techvault.platform.model.ActivityCompletion;

import java.util.List;
import java.util.Optional;

public interface ActivityCompletionService {
    ActivityCompletion markCompleted(ActivityCompletion completion);
    Optional<ActivityCompletion> getActivityCompletionById(Long id);
    List<ActivityCompletion> getAllActivityCompletions();
    void deleteActivityCompletionById(Long id);
}
