import React, { useState } from "react";
import { postData } from "../../api.js";

function CreateCourse({ userInfo, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        imageCoverUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: form.title,
            description: form.description,
            imageCoverUrl: form.imageCoverUrl,
            courseAuthorId: userInfo.id,
        };

        await postData("courses", data);

        setForm({ title: "", description: "", imageCoverUrl: "" });
        window.location.reload();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Create New Course
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            <input
                type="url"
                name="imageCoverUrl"
                placeholder="Image Cover URL"
                value={form.imageCoverUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            <div className="flex justify-between space-x-4">
                <button
                    type="submit"
                    className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                >
                    Add Course
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CreateCourse;
