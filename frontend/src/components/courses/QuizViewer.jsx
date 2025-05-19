import React, { useState } from "react";

function QuizViewer({ quiz }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    const handleChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        quiz.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const totalQuestions = quiz.questions.length;
        const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

        setScore(calculatedScore);
        setSubmitted(true);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h2>

            {quiz.questions.map((q) => (
                <div
                    key={q.id}
                    className="mb-6 p-4 border rounded-lg hover:shadow-lg transition-shadow"
                >
                    <p className="font-semibold mb-3 text-gray-800">{q.prompt}</p>

                    {q.options.map((option, index) => {
                        const isSelected = answers[q.id] === option;
                        const isCorrect = option === q.correctAnswer;
                        const showAnswer = submitted;

                        // Determine colors based on answer state
                        let labelClasses = "flex items-center space-x-3 cursor-pointer";
                        if (showAnswer) {
                            if (isSelected && isCorrect) {
                                labelClasses += " text-green-700 font-semibold";
                            } else if (isSelected && !isCorrect) {
                                labelClasses += " text-red-600 line-through";
                            } else if (!isSelected && isCorrect) {
                                labelClasses += " text-green-600 underline";
                            } else {
                                labelClasses += " text-gray-700";
                            }
                        }

                        return (
                            <label key={index} className={labelClasses}>
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={option}
                                    checked={isSelected}
                                    onChange={() => handleChange(q.id, option)}
                                    disabled={submitted}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>{option}</span>
                            </label>
                        );
                    })}

                    {submitted && (
                        <p
                            className={`mt-2 font-semibold ${
                                answers[q.id] === q.correctAnswer
                                    ? "text-green-700"
                                    : "text-red-600"
                            }`}
                        >
                            {answers[q.id] === q.correctAnswer
                                ? "Correct!"
                                : `Wrong. Correct answer: ${q.correctAnswer}`}
                        </p>
                    )}
                </div>
            ))}

            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            ) : (
                <h3 className="text-center text-xl font-bold text-gray-900 mt-4">
                    Your score: {score} / 100
                </h3>
            )}
        </div>
    );
}

export default QuizViewer;
