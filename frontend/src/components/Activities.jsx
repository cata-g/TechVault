import React, { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api";

function Activities() {
    const [activities, setActivities] = useState([]);
    const [courses, setCourses] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        pointsAwarded: 0,
        courseId: "",
        type: "Assignment",
        assignmentDetails: "",
        numberOfQuestions: 1,
        videoUrl: "",
    });

    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        loadActivities();
        loadCourses();
    }, []);

    useEffect(() => {
        if (form.type === "Quiz") {
            const n = parseInt(form.numberOfQuestions) || 1;
            const initialQuestions = [];
            for (let i = 0; i < n; i++) {
                initialQuestions.push({
                    questionText: "",
                    answers: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                    ],
                });
            }
            setQuizQuestions(initialQuestions);
        } else {
            setQuizQuestions([]);
        }
    }, [form.type, form.numberOfQuestions]);

    const loadActivities = async () => {
        const data = await fetchData("activities");
        setActivities(data);
    };

    const loadCourses = async () => {
        const data = await fetchData("courses");
        setCourses(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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

    const handleEdit = (activity) => {
        setEditingId(activity.id);
        setForm({
            title: activity.title || "",
            description: activity.description || "",
            pointsAwarded: activity.pointsAwarded || 0,
            courseId: activity.course?.id || "",
            type: activity.type || "Assignment",
            assignmentDetails: activity.assignmentDetails || "",
            numberOfQuestions: activity.numberOfQuestions || 1,
            videoUrl: activity.videoUrl || "",
        });

        if (activity.type === "Quiz" && activity.questions) {
            setQuizQuestions(activity.questions);
        } else {
            setQuizQuestions([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this activity?")) {
            await deleteData(`activities/${id}`);
            loadActivities();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            title: form.title,
            description: form.description,
            pointsAwarded: Number(form.pointsAwarded),
            course: { id: form.courseId },
            type: form.type,
        };

        if (form.type === "Quiz") {
            data.numberOfQuestions = Number(form.numberOfQuestions);
            data.questions = quizQuestions;
        }

        if (form.type === "Assignment") {
            data.assignmentDetails = form.assignmentDetails;
        }

        if (form.type === "Lecture") {
            data.videoUrl = form.videoUrl;
        }

        if (editingId) {
            await putData(`activities/${editingId}`, data);
            setEditingId(null);
        } else {
            await postData("activities", data);
        }

        setForm({
            title: "",
            description: "",
            pointsAwarded: 0,
            courseId: "",
            type: "Assignment",
            assignmentDetails: "",
            numberOfQuestions: 1,
            videoUrl: "",
        });
        setQuizQuestions([]);
        loadActivities();
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            title: "",
            description: "",
            pointsAwarded: 0,
            courseId: "",
            type: "Assignment",
            assignmentDetails: "",
            numberOfQuestions: 1,
            videoUrl: "",
        });
        setQuizQuestions([]);
    };

    return (
        <div>
            <h2>Activities</h2>



            <h3>Existing Activities</h3>
            <ul>
                {activities.map((a) => (
                    <li key={a.id} style={{ marginBottom: 10 }}>
                        <strong>{a.title}</strong> ({a.type}) - Points: {a.pointsAwarded}{" "}
                        - Course: {a.course?.name || "N/A"}
                        <br />
                        <button onClick={() => handleEdit(a)}>Edit</button>
                        <button
                            onClick={() => handleDelete(a.id)}
                            style={{ marginLeft: 10 }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Activities;
