import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShowCourses from "../courses/ShowCourses.jsx";

function WelcomeDashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8081/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data);
            } catch (err) {
                setError('Failed to fetch user info');
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
                    Welcome to Dashboard
                </h2>

                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                {userInfo ? (
                    <div className="text-center space-y-2 text-gray-700">
                        <p>
                            <strong className="text-gray-900">ID:</strong> {userInfo.id}
                        </p>
                        <p>
                            <strong className="text-gray-900">Username:</strong> {userInfo.username}
                        </p>
                        <p>
                            <strong className="text-gray-900">Role:</strong> {userInfo.role}
                        </p>
                        <p>
                            <strong className="text-gray-900">Points:</strong> {userInfo.points}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading user info...</p>
                )}
            </div>

            {userInfo && (
                <div className="w-full max-w-7xl px-4">
                    {userInfo.role === 'ADMIN' && <ShowCourses user={userInfo} />}
                    {userInfo.role === 'TEACHER' && <ShowCourses user={userInfo} whatCourses={"users"} />}
                    {userInfo.role === 'STUDENT' && (
                        <p className="text-center text-gray-600">No dashboard content for students yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default WelcomeDashboard;
