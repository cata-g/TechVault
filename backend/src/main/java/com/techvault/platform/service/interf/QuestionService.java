package com.techvault.platform.service.interf;

import com.techvault.platform.model.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Question createQuestion(Question question);
    Optional<Question> getQuestionById(Long id);
    List<Question> getAllQuestions();
    Question updateQuestion(Long id, Question updatedQuestion);
    void deleteQuestion(Long id);
}
