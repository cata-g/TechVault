import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // <-- import useNavigate
import { fetchData } from "../../api.js";
import QuizViewer from "./QuizViewer.jsx";

function ActivityPage() {
    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // <-- initialize navigate

    useEffect(() => {
        const loadActivity = async () => {
            try {
                console.log("Loading activityId:", activityId);
                const data = await fetchData(`activities/${activityId}`);
                console.log("Fetched activity:", data);
                if (!data) {
                    setError("Activity not found.");
                    return;
                }
                setActivity(data);
            } catch (err) {
                setError("Failed to load activity.");
                console.error(err);
            }
        };
        loadActivity();
    }, [activityId]);

    if (error) return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-100 text-red-700 rounded shadow">
            <p>{error}</p>
        </div>
    );

    if (!activity)
        return (
            <div className="max-w-3xl mx-auto mt-10 p-6 text-center text-gray-600">
                Loading activity...
            </div>
        );

    const baseContainerClasses = "max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow";

    return (
        <div className={baseContainerClasses}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
                ← Back
            </button>

            {(() => {
                switch (activity.type?.toUpperCase()) {
                    case "LECTURE":
                        return (
                            <>
                                <h2 className="text-3xl font-bold mb-4">Lecture: {activity.title}</h2>
                                <p className="text-gray-700 whitespace-pre-line">{activity.description}</p>
                            </>
                        );

                    case "ASSIGNMENT":
                        return (
                            <>
                                <h2 className="text-3xl font-bold mb-4">Assignment: {activity.title}</h2>
                                <p className="text-gray-700 mb-6 whitespace-pre-line">{activity.description}</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                    Submit Assignment
                                </button>
                            </>
                        );

                    case "QUIZ":
                        return (
                            <>
                                <h2 className="text-3xl font-bold mb-4">Quiz: {activity.title}</h2>
                                <QuizViewer quiz={activity} />
                            </>
                        );

                    default:
                        return (
                            <>
                                <h2 className="text-3xl font-bold mb-4">Activity: {activity.title}</h2>
                                <p className="text-gray-700">Unknown activity type: {activity.type}</p>
                            </>
                        );
                }
            })()}
        </div>
    );
}

export default ActivityPage;
