import React, { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        imageCoverUrl: "",
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const data = await fetchData("courses");
        setCourses(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (course) => {
        setEditingId(course.id);
        setForm({
            title: course.title || "",
            description: course.description || "",
            imageCoverUrl: course.imageCoverUrl || "",
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteData(`courses/${id}`);
            loadCourses();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: form.title,
            description: form.description,
            imageCoverUrl: form.imageCoverUrl,
        };

        if (editingId) {
            await putData(`courses/${editingId}`, data);
            setEditingId(null);
        } else {
            await postData("courses", data);
        }

        setForm({ title: "", description: "", imageCoverUrl: "" });
        loadCourses();
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ title: "", description: "", imageCoverUrl: "" });
    };

    return (
        <div>
            <h2>Courses</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <input
                    name="imageCoverUrl"
                    placeholder="Image Cover URL"
                    value={form.imageCoverUrl}
                    onChange={handleChange}
                />
                <button type="submit">{editingId ? "Update" : "Add"} Course</button>
                {editingId && (
                    <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                        Cancel
                    </button>
                )}
            </form>

            <h3>Existing Courses</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} style={{ marginBottom: 10 }}>
                        <strong>{course.title}</strong> - {course.description}{" "}
                        {course.imageCoverUrl && (
                            <img
                                src={course.imageCoverUrl}
                                alt={course.title}
                                style={{ width: 50, height: 50, objectFit: "cover", marginLeft: 10 }}
                            />
                        )}
                        <div>Activities count: {course.activities ? course.activities.length : 0}</div>
                        <button onClick={() => handleEdit(course)} style={{ marginRight: 10 }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Courses;
