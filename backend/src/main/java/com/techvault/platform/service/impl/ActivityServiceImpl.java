package com.techvault.platform.service.impl;

import com.techvault.platform.model.Activity;
import com.techvault.platform.repository.ActivityRepository;
import com.techvault.platform.service.interf.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Override
    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    @Override
    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    @Override
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Override
    public Activity updateActivity(Long id, Activity updatedActivity) {
        if (!activityRepository.existsById(id)) return null;
        updatedActivity.setId(id);
        return activityRepository.save(updatedActivity);
    }

    @Override
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
