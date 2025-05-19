import React, { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api";

const roles = ["STUDENT", "TEACHER", "ADMIN"];

function Users() {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: roles[0],
        totalPoints: 0,
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await fetchData("users");
        setUsers(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "totalPoints" ? Number(value) : value,
        }));
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setForm({
            username: user.username || "",
            email: user.email || "",
            password: "", // leave password empty for edit, set only if changing
            role: user.role || roles[0],
            totalPoints: user.totalPoints || 0,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteData(`users/${id}`);
            loadUsers();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to send (password only if set on update)
        const data = {
            username: form.username,
            email: form.email,
            role: form.role,
            totalPoints: form.totalPoints,
        };
        if (form.password) {
            data.password = form.password;
        }

        if (editingId) {
            await putData(`users/${editingId}`, data);
            setEditingId(null);
        } else {
            // password required on create
            if (!form.password) {
                alert("Password is required for new users.");
                return;
            }
            data.password = form.password;
            await postData("users", data);
        }

        setForm({
            username: "",
            email: "",
            password: "",
            role: roles[0],
            totalPoints: 0,
        });
        loadUsers();
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            username: "",
            email: "",
            password: "",
            role: roles[0],
            totalPoints: 0,
        });
    };

    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder={editingId ? "New Password (optional)" : "Password"}
                    value={form.password}
                    onChange={handleChange}
                    {...(!editingId && { required: true })}
                />
                <select name="role" value={form.role} onChange={handleChange}>
                    {roles.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <input
                    name="totalPoints"
                    type="number"
                    placeholder="Total Points"
                    value={form.totalPoints}
                    onChange={handleChange}
                    min={0}
                />
                <button type="submit">{editingId ? "Update" : "Add"} User</button>
                {editingId && (
                    <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                        Cancel
                    </button>
                )}
            </form>

            <h3>Existing Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id} style={{ marginBottom: 10 }}>
                        <strong>{user.username}</strong> ({user.email}) - Role: {user.role} - Points:{" "}
                        {user.totalPoints}
                        <button onClick={() => handleEdit(user)} style={{ marginLeft: 10, marginRight: 10 }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
