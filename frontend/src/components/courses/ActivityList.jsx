import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../api.js";

function ActivityList({ courseId }) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchData(`courses/${courseId}/activities`);
            setActivities(data);
        };
        load();
    }, [courseId]);

    return (
        <div>
            <h3>Activities</h3>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <Link to={`/activities/${activity.id}`}>
                            {activity.title} ({activity.type})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityList;
