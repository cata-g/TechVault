package com.techvault.platform.service.interf;

import com.techvault.platform.model.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    Quiz createQuiz(Quiz quiz);
    Optional<Quiz> getQuizById(Long id);
    List<Quiz> getAllQuizzes();
    Quiz updateQuiz(Long id, Quiz updatedQuiz);
    void deleteQuiz(Long id);
}
