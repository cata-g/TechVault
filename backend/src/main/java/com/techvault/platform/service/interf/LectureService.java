package com.techvault.platform.service.interf;

import com.techvault.platform.model.Lecture;

import java.util.List;
import java.util.Optional;

public interface LectureService {
    Lecture createLecture(Lecture lecture);
    Optional<Lecture> getLectureById(Long id);
    List<Lecture> getAllLectures();
    Lecture updateLecture(Long id, Lecture updatedLecture);
    void deleteLecture(Long id);
}
