import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { fetchData } from "../../api.js";
import ActivityCreator from "./ActivityCreator.jsx";

function ActivityList({ courseId, activities = [], onNavigate }) {
    return (
        <ul className="space-y-4 mt-4">
            {activities.length === 0 ? (
                <p className="text-gray-500 italic">No activities found.</p>
            ) : (
                activities.map((activity) => (
                    <div
                        key={activity.id}
                        onClick={() => onNavigate(activity)}
                        className="cursor-pointer p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition flex items-center justify-between"
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter') onNavigate(activity); }}
                        aria-label={`Go to activity ${activity.title}`}
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-blue-600">{activity.title} ({activity.type})</h3>
                            <p className="text-gray-600 line-clamp-2">{activity.description || "No description available."}</p>
                        </div>
                        <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                ))
            )}
        </ul>
    );
}

function CoursePage() {
    const location = useLocation();
    const { course, user } = location.state || {};
    const [showActivityCreator, setShowActivityCreator] = useState(false);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();
    if (!course) return <div>Loading...</div>;

    useEffect(() => {
        if (course?.id) {
            const fetchActivities = async () => {
                try {
                    const data = await fetchData(`courses/${course.id}/activities`);
                    setActivities(data);
                } catch (error) {
                    console.error("Error fetching activities:", error);
                }
            };
            fetchActivities();
        }
        console.log(course);
    }, [course]);

    const handleNavigateActivity = (activity) => {
        // Example navigation handler - customize as needed
        navigate(`/courses/${course.id}/activities/${activity.id}`);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">{course.title}</h1>
            <p className="text-gray-700 mb-6">{course.description}</p>
            {user && <p className="mb-6 text-gray-600">Welcome, <span className="font-semibold">{user.username}</span>!</p>}

            {(user.role === "TEACHER" || user.role === "ADMIN") && (
                <button
                    onClick={() => setShowActivityCreator(true)}
                    className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700 transition"
                >
                    Add Activities
                </button>
            )}

            {showActivityCreator && (
                <div className="mb-8 p-4 border border-blue-300 rounded-md bg-blue-50 shadow-inner">
                    <ActivityCreator course={course} />
                    <button
                        onClick={() => setShowActivityCreator(false)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-2">Activities</h2>

            <ActivityList courseId={course.id} activities={activities} onNavigate={handleNavigateActivity} />
        </div>
    );
}

export default CoursePage;
