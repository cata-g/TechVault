package com.techvault.platform.service.impl;

import com.techvault.platform.model.Assignment;
import com.techvault.platform.repository.AssignmentRepository;
import com.techvault.platform.service.interf.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Optional<Assignment> getAssignmentById(Long id) {
        return assignmentRepository.findById(id);
    }

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        if (!assignmentRepository.existsById(id)) return null;
        updatedAssignment.setId(id);
        return assignmentRepository.save(updatedAssignment);
    }

    @Override
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}
