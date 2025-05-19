import React, {useEffect, useState} from 'react';
import ShowCourses from "../courses/ShowCourses.jsx";
import axios from "axios";
import CreateCourse from "../courses/CreateCourse.jsx";
import Hero from "../Hero.jsx";
import Footer from "../Footer.jsx";
function MainPage() {
    const [userInfo, setUserInfo] = useState(null);
    const [showCreateCourse, setShowCreateCourse] = useState(false);

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                //console.log('Token used for /me:', token);
                const response = await axios.get('http://localhost:8081/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserInfo(response.data);
            } catch (err) {
                console.error('Failed to fetch user info:', err);
                setError('Failed to fetch user info');
            }
        };

        fetchUserInfo();
    }, []);


    return (
        <div>
            <Hero/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900">Courses</h2>
                    {userInfo && (userInfo.role === "TEACHER" || userInfo.role === "ADMIN") && !showCreateCourse && (
                        <button
                            onClick={() => setShowCreateCourse(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                        >
                            Add Courses
                        </button>
                    )}
                </div>

                {showCreateCourse && userInfo && (
                    <div className="mt-4 border p-4 rounded-md shadow-md bg-white">
                        <CreateCourse userInfo={userInfo} onCancel={() => setShowCreateCourse(false)}/>
                    </div>
                )}

            </div>
                <ShowCourses user={userInfo} whatCourses={"mainPageToJoin"}/>
            <Footer />
            </div>
            );
            }

            export default MainPage;