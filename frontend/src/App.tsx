import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import Layout from "./Components/Layout.tsx";
import TeacherDashboard from "./screens/TeacherDashboard.tsx";
import ProfilePage from "./Components/ProfilePage.tsx";
import StudentDashboard from "./screens/StudentDashboard.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="2" element={<TeacherDashboard/>}/>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
