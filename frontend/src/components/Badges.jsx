import React, { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api";

function Badges() {
    const [badges, setBadges] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        iconPath: "",
    });

    useEffect(() => {
        loadBadges();
    }, []);

    const loadBadges = async () => {
        const data = await fetchData("badges");
        setBadges(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (badge) => {
        setEditingId(badge.id);
        setForm({
            title: badge.title || "",
            iconPath: badge.iconPath || "",
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this badge?")) {
            await deleteData(`badges/${id}`);
            loadBadges();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: form.title,
            iconPath: form.iconPath,
        };

        if (editingId) {
            await putData(`badges/${editingId}`, data);
            setEditingId(null);
        } else {
            await postData("badges", data);
        }

        setForm({ title: "", iconPath: "" });
        loadBadges();
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ title: "", iconPath: "" });
    };

    return (
        <div>
            <h2>Badges</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    name="iconPath"
                    placeholder="Icon Path"
                    value={form.iconPath}
                    onChange={handleChange}
                />
                <button type="submit">{editingId ? "Update" : "Add"} Badge</button>
                {editingId && (
                    <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                        Cancel
                    </button>
                )}
            </form>

            <h3>Existing Badges</h3>
            <ul>
                {badges.map((badge) => (
                    <li key={badge.id}>
                        <strong>{badge.title}</strong>{" "}
                        {badge.iconPath && (
                            <img
                                src={badge.iconPath}
                                alt={badge.title}
                                style={{ width: 20, height: 20, marginLeft: 5 }}
                            />
                        )}
                        <button onClick={() => handleEdit(badge)} style={{ marginLeft: 10 }}>
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(badge.id)}
                            style={{ marginLeft: 5 }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Badges;
