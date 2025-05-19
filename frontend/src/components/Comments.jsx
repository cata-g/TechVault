import React, { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api";

function Comments() {
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ content: "", userId: "", activityId: "" });
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadComments();
        fetchData("users").then(setUsers);
        fetchData("activities").then(setActivities);
    }, []);

    const loadComments = () => fetchData("comments").then(setComments);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            content: form.content,
            user: { id: form.userId },
            activity: { id: form.activityId },
        };
        if (editingId) {
            await putData(`comments/${editingId}`, data);
            setEditingId(null);
        } else {
            await postData("comments", data);
        }
        setForm({ content: "", userId: "", activityId: "" });
        loadComments();
    };

    const handleEdit = (comment) => {
        setForm({
            content: comment.content,
            userId: comment.user?.id || "",
            activityId: comment.activity?.id || "",
        });
        setEditingId(comment.id);
    };

    const handleDelete = async (id) => {
        await deleteData(`comments/${id}`);
        loadComments();
    };

    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
        <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            required
        />
                <select name="userId" value={form.userId} onChange={handleChange} required>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name || user.email}
                        </option>
                    ))}
                </select>
                <select name="activityId" value={form.activityId} onChange={handleChange} required>
                    <option value="">Select Activity</option>
                    {activities.map((act) => (
                        <option key={act.id} value={act.id}>
                            {act.title} ({act.type || "Activity"})
                        </option>
                    ))}
                </select>
                <button type="submit">{editingId ? "Update" : "Add"}</button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ content: "", userId: "", activityId: "" });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <b>{comment.user?.name || comment.user?.email}</b>: {comment.content} (Activity:{" "}
                        {comment.activity?.title})
                        <button onClick={() => handleEdit(comment)}>Edit</button>
                        <button onClick={() => handleDelete(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;
