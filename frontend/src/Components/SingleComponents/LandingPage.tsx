// import React, { useEffect } from "react";
// import { useUserStore } from "../../store/User.store.ts";
// import { Button } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";

// const LandingPage: React.FC = () => {
//   const user = useUserStore((state) => state.user);

//   useEffect(() => {
//     console.log(user);
//   }, []);

//   const handleGoogleLogin = (logger?: string) => {
//     if (logger == "interviewer") {
//       window.location.href = `${
//         import.meta.env.VITE_BACKEND_URL
//       }/auth/google?isInterviewer=true`;
//     } else
//       window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
//   };

//   return (
//     <div
//       className={`h-screen w-screen flex justify-center items-center bg-sky-100 flex-col gap-5`}
//     >
//       <div className="flex gap-5 justify-center items-center">
//         <img className="w-40" src="/logo.svg" alt="error" />
//         <div className="text-black inline text-5xl sm:text-8xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-500  to-green-600">
//           {" "}
//           Mockmate
//         </div>
//       </div>

//       <div className="text-sm sm:text-3xl font-poppins font-extrabold text-center">
//         {" "}
//         Elevate Your Experience With Senior Mock Interviews
//       </div>

//       <Button
//         onClick={() => {
//           handleGoogleLogin("interviewer");
//         }}
//         startIcon={<GoogleIcon />}
//         className={`font-bold `}
//       >
//         Start as Interviewer
//       </Button>
//       <Button className={`font-bold `}>Start as Interviewee</Button>
//     </div>
//   );
// };

// export default LandingPage;

import { useEffect } from "react";
import { useUserStore } from "../../store/User.store.ts";

import {
  Users,
  Video,
  Brain,
  ArrowRight,
  Laptop,
  UserCheck,
} from "lucide-react";

function EnhancedLandingPage() {
  const user = useUserStore((state: { user: any }) => state.user);

  useEffect(() => {
    console.log(user);
  }, []);

  const handleGoogleLogin = (logger?: string) => {
    if (logger == "interviewer") {
      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/auth/google?isInterviewer=true`;
    } else
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center lg:text-left lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <img
              className="w-40"
              src="https://res.cloudinary.com/dmrtl2bh1/image/upload/v1739007450/MockMate.png"
              alt="error"
            />
            <span className="ml-2 text-3xl font-bold text-gray-900">
              MockMate
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Master Your Interview Skills with Real-Time Practice
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with professional interviewers, practice your skills, and
            boost your confidence through realistic mock interviews on our
            cutting-edge platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
              onClick={() => {
                handleGoogleLogin();
              }}
            >
              Start as Candidate
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 
            transition flex items-center justify-center"
              onClick={() => {
                handleGoogleLogin("interviewer");
              }}
            >
              Start as Interviewer
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Professional interview setup"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MockMate?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Video className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                Real-Time Interviews
              </h3>
              <p className="text-gray-600">
                Practice with live interviewers through seamless Google Meet
                integration.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                Expert Interviewers
              </h3>
              <p className="text-gray-600">
                Connect with experienced professionals from your desired field.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Laptop className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                Skill-Based Matching
              </h3>
              <p className="text-gray-600">
                Choose interviews based on your specific skills and career
                goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                1. Select Your Role
              </h3>
              <p className="text-gray-600">
                Choose whether you want to practice as a candidate or help
                others as an interviewer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                2. Choose Your Skills
              </h3>
              <p className="text-gray-600">
                Select the specific skills or topics you want to focus on during
                the interview.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Start Interview</h3>
              <p className="text-gray-600">
                Connect through Google Meet and begin your professional mock
                interview session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnhancedLandingPage;
