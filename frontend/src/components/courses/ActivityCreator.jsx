import React, { useState } from "react";
import { postData } from "../../api.js";

function ActivityCreator({ course }) {
    const initialQuestion = {
        questionText: "",
        answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ],
    };

    const [form, setForm] = useState({
        title: "",
        description: "",
        pointsAwarded: 0,
        type: "Assignment",
        assignmentDetails: "",
        numberOfQuestions: 1,
        videoUrl: "",
    });

    // Initialize quizQuestions with one question by default
    const [quizQuestions, setQuizQuestions] = useState([initialQuestion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "numberOfQuestions") {
            const count = parseInt(value, 10) || 1;
            const updated = Array.from({ length: count }, () => ({
                questionText: "",
                answers: [
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                ],
            }));
            setQuizQuestions(updated);
        }
    };

    const handleQuestionTextChange = (index, value) => {
        const updated = [...quizQuestions];
        updated[index].questionText = value;
        setQuizQuestions(updated);
    };

    const handleAnswerTextChange = (qIndex, aIndex, value) => {
        const updated = [...quizQuestions];
        updated[qIndex].answers[aIndex].text = value;
        setQuizQuestions(updated);
    };

    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const updated = [...quizQuestions];
        updated[qIndex].answers = updated[qIndex].answers.map((ans, idx) => ({
            ...ans,
            isCorrect: idx === aIndex,
        }));
        setQuizQuestions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: form.title,
            description: form.description,
            pointsAwarded: Number(form.pointsAwarded),
            type: form.type,
            course: { id: course.id },
        };

        if (form.type === "Quiz") {
            const questions = quizQuestions.map((q) => {
                const options = q.answers.map((a) => a.text);
                const correct = q.answers.find((a) => a.isCorrect);
                return {
                    prompt: q.questionText,
                    options,
                    correctAnswer: correct ? correct.text : "",
                };
            });
            data.questions = questions;
        } else if (form.type === "Assignment") {
            data.description = form.assignmentDetails;
        } else if (form.type === "Lecture") {
            data.videoUrl = form.videoUrl;
        }

        try {
            await postData("activities", data);

            // Reset form and quizQuestions after successful submit
            setForm({
                title: "",
                description: "",
                pointsAwarded: 0,
                type: "Assignment",
                assignmentDetails: "",
                numberOfQuestions: 1,
                videoUrl: "",
            });
            setQuizQuestions([initialQuestion]);
        } catch (error) {
            console.error("Failed to add activity:", error);
            // Optionally add user feedback on error here
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6"
        >
            <div>
                <label htmlFor="title" className="block font-semibold mb-1">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block font-semibold mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="pointsAwarded" className="block font-semibold mb-1">
                    Points Awarded
                </label>
                <input
                    id="pointsAwarded"
                    name="pointsAwarded"
                    type="number"
                    placeholder="Points Awarded"
                    value={form.pointsAwarded}
                    onChange={handleChange}
                    min={0}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="type" className="block font-semibold mb-1">
                    Activity Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Assignment">Assignment</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Lecture">Lecture</option>
                </select>
            </div>

            {form.type === "Quiz" && (
                <>
                    <div>
                        <label
                            htmlFor="numberOfQuestions"
                            className="block font-semibold mb-1"
                        >
                            Number of Questions
                        </label>
                        <input
                            id="numberOfQuestions"
                            name="numberOfQuestions"
                            type="number"
                            placeholder="Number of Questions"
                            value={form.numberOfQuestions}
                            onChange={handleChange}
                            min={1}
                            max={20}
                            required
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {quizQuestions.map((q, qIdx) => (
                        <div
                            key={qIdx}
                            className="border border-gray-300 p-4 rounded space-y-3"
                        >
                            <label className="block font-semibold mb-1">
                                Question {qIdx + 1}
                            </label>
                            <input
                                type="text"
                                value={q.questionText}
                                onChange={(e) =>
                                    handleQuestionTextChange(qIdx, e.target.value)
                                }
                                placeholder="Enter question text"
                                required
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {q.answers.map((ans, aIdx) => (
                                <div key={aIdx} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${qIdx}`}
                                        checked={ans.isCorrect}
                                        onChange={() => handleCorrectAnswerChange(qIdx, aIdx)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Answer ${aIdx + 1}`}
                                        value={ans.text}
                                        onChange={(e) =>
                                            handleAnswerTextChange(qIdx, aIdx, e.target.value)
                                        }
                                        required
                                        className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}

            {form.type === "Assignment" && (
                <div>
                    <label
                        htmlFor="assignmentDetails"
                        className="block font-semibold mb-1"
                    >
                        Assignment Details
                    </label>
                    <textarea
                        id="assignmentDetails"
                        name="assignmentDetails"
                        placeholder="Assignment Details"
                        value={form.assignmentDetails}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ minHeight: 80 }}
                    />
                </div>
            )}

            {form.type === "Lecture" && (
                <div>
                    <label htmlFor="videoUrl" className="block font-semibold mb-1">
                        Video URL
                    </label>
                    <input
                        id="videoUrl"
                        name="videoUrl"
                        placeholder="Video URL"
                        value={form.videoUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}

            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Add Activity
            </button>
        </form>
    );
}

export default ActivityCreator;
