package com.techvault.platform.service.impl;

import com.techvault.platform.model.ActivityCompletion;
import com.techvault.platform.repository.ActivityCompletionRepository;
import com.techvault.platform.service.interf.ActivityCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityCompletionServiceImpl implements ActivityCompletionService {

    @Autowired
    private ActivityCompletionRepository activityCompletionRepository;

    @Override
    public ActivityCompletion markCompleted(ActivityCompletion activityCompletion) {
        return activityCompletionRepository.save(activityCompletion);
    }

    @Override
    public Optional<ActivityCompletion> getActivityCompletionById(Long id) {
        return activityCompletionRepository.findById(id);
    }

    @Override
    public List<ActivityCompletion> getAllActivityCompletions() {
        return activityCompletionRepository.findAll();
    }

    @Override
    public void deleteActivityCompletionById(Long id) {
        activityCompletionRepository.deleteById(id);
    }
}
