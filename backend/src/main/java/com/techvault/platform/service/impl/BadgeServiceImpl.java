package com.techvault.platform.service.impl;

import com.techvault.platform.model.Badge;
import com.techvault.platform.repository.BadgeRepository;
import com.techvault.platform.service.interf.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BadgeServiceImpl implements BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public Badge createBadge(Badge badge) {
        return badgeRepository.save(badge);
    }

    @Override
    public Optional<Badge> getBadgeById(Long id) {
        return badgeRepository.findById(id);
    }

    @Override
    public List<Badge> getAllBadges() {
        return badgeRepository.findAll();
    }

    @Override
    public void deleteBadge(Long id) {
        badgeRepository.deleteById(id);
    }
}
