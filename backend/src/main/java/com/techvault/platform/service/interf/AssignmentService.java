package com.techvault.platform.service.interf;

import com.techvault.platform.model.Assignment;

import java.util.List;
import java.util.Optional;

public interface AssignmentService {
    Assignment createAssignment(Assignment assignment);
    Optional<Assignment> getAssignmentById(Long id);
    List<Assignment> getAllAssignments();
    Assignment updateAssignment(Long id, Assignment updatedAssignment);
    void deleteAssignment(Long id);
}
