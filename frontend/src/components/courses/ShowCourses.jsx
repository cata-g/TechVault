import React, { useEffect, useState } from "react";
import { deleteData, fetchData, postData } from "../../api.js";
import { useNavigate } from "react-router-dom";

function CourseCard({ course, user }) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteData(`courses/${id}`);
            window.location.reload();
        }
    };

    const showEditCourse = (authorId) => {
        if (user.id === authorId || user.role === "ADMIN") {
            return (
                <button
                    onClick={() => handleDelete(course.id)}
                    className="mt-4 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                >
                    Delete
                </button>
            );
        }
        return null;
    };

    const goToCoursePage = () => {
        navigate(`/courses/${course.id}`, { state: { course, user } });
    };

    return (
        <div className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
            <div
                onClick={goToCoursePage}
                className="cursor-pointer h-40 bg-center bg-cover"
                style={{ backgroundImage: `url(${course.imageCoverUrl || "/default-course.jpg"})` }}
                title={course.title}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3
                    onClick={goToCoursePage}
                    className="text-lg font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer mb-2"
                >
                    {course.title}
                </h3>
                <p className="text-gray-600 flex-grow line-clamp-3">
                    {course.description || "No description provided."}
                </p>
                {showEditCourse(course.authorId)}
            </div>
        </div>
    );
}

function ShowCourses({ whatCourses, user }) {
    const [courses, setCourses] = useState([]);
    const [allCoursesAvailable, setAllCoursesAvailable] = useState([]);
    const [allJointCourses, setAllJointCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        shareCourses();
    }, [courses]);

    const loadCourses = async () => {
        let endpoint = "";
        switch (whatCourses) {
            case "users":
                endpoint = "courses/coursesOf?" + user.id;
                break;
            default:
                endpoint = "courses";
                break;
        }
        const data = await fetchData(endpoint);
        setCourses(data);
    };

    const checkIfEnrolled = async (courseId) => {
        return await fetchData("userDetails/" + user.id + "/isEnrolledTo/" + courseId + "/");
    };

    const shareCourses = async () => {
        const jointC = [];
        const allC = [];

        const enrollmentStatuses = await Promise.all(
            courses.map(async (course) => {
                const isEnrolled = await checkIfEnrolled(course.id);
                return { course, isEnrolled };
            })
        );

        enrollmentStatuses.forEach(({ course, isEnrolled }) => {
            if (isEnrolled) {
                jointC.push(course);
            } else {
                allC.push(course);
            }
        });

        setAllCoursesAvailable(allC);
        setAllJointCourses(jointC);
    };

    const handleEnrollToCourse = async (course) => {
        await postData("userDetails/" + user.id + "/courses", course);
        window.location.reload();
    };

    const handleUnenrollToCourse = async (course) => {
        await deleteData("userDetails/" + user.id + "/courses", course);
        window.location.reload();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {whatCourses === "mainPageToJoin" ? (
                <>
                    <section className="mb-14">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Courses</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {allJointCourses.length > 0 ? (
                                allJointCourses.map((course) => (
                                    <li
                                        key={course.id}
                                        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
                                    >
                                        <CourseCard course={course} user={user} />
                                        <button
                                            onClick={() => handleUnenrollToCourse(course)}
                                            className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 transition rounded-b-lg"
                                        >
                                            Unenroll
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full">You are not enrolled in any courses yet.</p>
                            )}
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Other Available Courses</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {allCoursesAvailable.length > 0 ? (
                                allCoursesAvailable.map((course) => (
                                    <li
                                        key={course.id}
                                        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
                                    >
                                        <CourseCard course={course} user={user} />
                                        <button
                                            onClick={() => handleEnrollToCourse(course)}
                                            className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 transition rounded-b-lg"
                                        >
                                            Enroll
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full">No other courses available at the moment.</p>
                            )}
                        </ul>
                    </section>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Existing Courses</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <li
                                    key={course.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                                >
                                    <CourseCard course={course} user={user} />
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full">No courses found.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ShowCourses;
