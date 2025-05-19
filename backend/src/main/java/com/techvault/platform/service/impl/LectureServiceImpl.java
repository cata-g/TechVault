package com.techvault.platform.service.impl;

import com.techvault.platform.model.Lecture;
import com.techvault.platform.repository.LectureRepository;
import com.techvault.platform.service.interf.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LectureServiceImpl implements LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    @Override
    public Lecture createLecture(Lecture lecture) {
        return lectureRepository.save(lecture);
    }

    @Override
    public Optional<Lecture> getLectureById(Long id) {
        return lectureRepository.findById(id);
    }

    @Override
    public List<Lecture> getAllLectures() {
        return lectureRepository.findAll();
    }

    @Override
    public Lecture updateLecture(Long id, Lecture updatedLecture) {
        if (!lectureRepository.existsById(id)) return null;
        updatedLecture.setId(id);
        return lectureRepository.save(updatedLecture);
    }

    @Override
    public void deleteLecture(Long id) {
        lectureRepository.deleteById(id);
    }
}
