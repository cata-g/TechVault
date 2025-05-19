package com.techvault.platform.service.interf;

import com.techvault.platform.model.Badge;

import java.util.List;
import java.util.Optional;

public interface BadgeService {
    Badge createBadge(Badge badge);
    Optional<Badge> getBadgeById(Long id);
    List<Badge> getAllBadges();
    void deleteBadge(Long id);
}
