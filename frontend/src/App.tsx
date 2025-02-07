
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "./Components/SingleComponents/LandingPage.tsx";
import Layout from "./Components/SingleComponents/Layout.tsx";
import TeacherDashboard from "./screens/TeacherDashboard.tsx";
import ProfilePage from "./Components/SingleComponents/ProfilePage.tsx";
import StudentDashboard from "./screens/StudentDashboard.tsx";
import NotificationCard from "./Components/SingleComponents/NotificationCard.tsx";
import ProtectedComponent from "./Components/SingleComponents/ProtectiveComponent.tsx";
import {useUserStore} from "./store/User.store.ts";

function App() {
    const user = useUserStore((state:any) => state.user);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/home"/> : <LandingPage/>}/>
                <Route path="/home" element={<ProtectedComponent><Layout/></ProtectedComponent>}>
                    <Route index element={<StudentDashboard/>}/>
                    <Route path="2" element={<TeacherDashboard/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route
                        path="notification"
                        element={
                            <NotificationCard
                                imageUrl="https://example.com/avatar1.jpg"
                                message="Dr. Rahela Farooqi posted: DMS Jamia Millia Islamia"
                                time="6m"
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
