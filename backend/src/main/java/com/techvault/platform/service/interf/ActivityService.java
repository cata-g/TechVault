package com.techvault.platform.service.interf;

import com.techvault.platform.model.Activity;

import java.util.List;
import java.util.Optional;

public interface ActivityService {
    Activity createActivity(Activity activity);
    Optional<Activity> getActivityById(Long id);
    List<Activity> getAllActivities();
    Activity updateActivity(Long id, Activity updatedActivity);
    void deleteActivity(Long id);
}
