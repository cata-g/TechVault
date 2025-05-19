package com.techvault.platform.service.impl;

import com.techvault.platform.model.Quiz;
import com.techvault.platform.repository.QuizRepository;
import com.techvault.platform.service.interf.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        if (!quizRepository.existsById(id)) return null;
        updatedQuiz.setId(id);
        return quizRepository.save(updatedQuiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
}
