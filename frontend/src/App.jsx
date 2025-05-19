import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage.jsx';
import SignupPage from './components/Pages/SignUpPage.jsx';
import Dashboard from "./components/Pages/Dashboard.jsx";
import MainPage from "./components/Pages/MainPage.jsx";
import CoursePage from "./components/courses/CoursePage.jsx";
import ActivityPage from "./components/courses/ActivityPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

    return (
        <div className="App">
            <Navbar />
            <Router>

                <Routes>
                    <Route path="/" element={localStorage.getItem("token") === null ? <LoginPage/> : <MainPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/courses/:id" element={<CoursePage />} />
                    <Route path="/courses/:courseId/activities/:activityId" element={<ActivityPage />} />
                </Routes>

            </Router>
        </div>
    );
}

export default App;