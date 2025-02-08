import { Button } from "@mui/material";
import NavbarComponent from "../SingleComponents/NavigationBar.tsx";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket.ts";

const hardcodedSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "C++",
  "Java",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Docker",
];

const SkillPopup = ({ user }: { user: any }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleAddSkill = (skill: string) => {
    if (skills.includes(skill)) {
      return;
    }
    setSkills((prev) => [...prev, skill]);
  };

  const deleteSkill = (idx: number) => {
    setSkills((prev) => {
      return prev.filter((_, i) => {
        return i != idx;
      });
    });
  };

  const handleStart = async () => {
    const res = await axiosInstance.post("/candidate/start-interview", {
      userId: user.id,
      skills: skills,
    });
    console.log(res);
  };

  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-70 h-full w-full flex justify-center items-center">
      <div className="h-[40%] w-[50%] p-4 bg-white">
        <div className="w-full flex flex-wrap gap-2">
          {skills.map((skill, idx) => {
            return (
              <div key={idx} className="w-fit h-fit text-sm rounded-md p-2">
                {skill + " "}
                <span>
                  <button onClick={() => deleteSkill(idx)}>X</button>
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full flex-col justify-center items-center p-2">
          <button
            className="w-fit text-md p-2 rounded-md border"
            onClick={() => setDropdown((prev) => !prev)}
          >
            Select skills v
          </button>
          {dropdown && (
            <div className="w-full border flex-col gap-2 w-[30%] h-[25%] overflow-auto justify-center items-center absolute bg-white mt-1 z-40">
              {hardcodedSkills.map((skill, idx) => {
                return (
                  <button
                    className="w-full border-b "
                    key={idx}
                    onClick={() => handleAddSkill(skill)}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <Button onClick={handleStart}>Start</Button>
      </div>
    </div>
  );
};

const Candidate = () => {
  const [user, setUser] = useState<any>({});
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const router = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/user");
      setUser(res.data);
    } catch (error) {
      console.log(error);
      router("/");
    }
  };

  const handleClick = () => {
    setOpenPopUp((prev) => !prev);
  };

  useEffect(() => {
    checkAuth();
    socket.on("meet-link", ({ link }) => {
      setLink(link);
      setMessage("Found Interviewer");
      setOpen(true);
      setLoading(false);
      setShowMeet(true);
    });
  }, []);

  return (
    <div className="flex-col justify-center items-center">
      <NavbarComponent />
      {openPopUp && <SkillPopup user={user} />}
      <Button variant="outlined" onClick={handleClick}>
        Ready to take interview
      </Button>
    </div>
  );
};

export default Candidate;

// import React, { useState } from "react";
// import {
//   Brain,
//   Code2,
//   Database,
//   Globe,
//   Layout,
//   Server,
//   Terminal,
//   X,
// } from "lucide-react";

// const technicalSkills = [
//   {
//     id: "frontend",
//     name: "Frontend Development",
//     icon: <Layout className="w-5 h-5" />,
//   },
//   {
//     id: "backend",
//     name: "Backend Development",
//     icon: <Server className="w-5 h-5" />,
//   },
//   {
//     id: "fullstack",
//     name: "Full Stack Development",
//     icon: <Code2 className="w-5 h-5" />,
//   },
//   {
//     id: "database",
//     name: "Database Management",
//     icon: <Database className="w-5 h-5" />,
//   },
//   { id: "devops", name: "DevOps", icon: <Terminal className="w-5 h-5" /> },
//   { id: "web3", name: "Web3 Development", icon: <Globe className="w-5 h-5" /> },
// ];

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleSkill = (skillId: string) => {
//     if (selectedSkills.includes(skillId)) {
//       setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
//     } else {
//       setSelectedSkills([...selectedSkills, skillId]);
//     }
//   };

//   const handleStartInterview = () => {
//     // Handle interview start logic here
//     console.log("Starting interview with skills:", selectedSkills);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen  bg-white">
//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-16 text-center">
//         <div className="max-w-2xl mx-auto">
//           <h1 className="text-4xl font-bold text-gray-900 mb-6">
//             Ready to Ace Your Technical Interview?
//           </h1>
//           <p className="text-xl text-gray-600 mb-12">
//             Select your preferred technical skills and get matched with an
//             expert interviewer for a personalized mock interview session.
//           </p>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700
//                      transition transform hover:scale-105 shadow-lg inline-flex items-center"
//           >
//             Ready to Take Interview
//             <Terminal className="ml-2 h-5 w-5" />
//           </button>
//         </div>

//         {/* Interview Selection Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Select Your Skills
//               </h2>

//               {/* Selected Skills */}
//               {selectedSkills.length > 0 && (
//                 <div className="mb-4 flex flex-wrap gap-2">
//                   {selectedSkills.map((skillId) => {
//                     const skill = technicalSkills.find((s) => s.id === skillId);
//                     return (
//                       <span
//                         key={skillId}
//                         className="inline-flex items-center px-3 py-1 rounded-full text-sm
//                                  bg-indigo-100 text-indigo-800"
//                       >
//                         {skill?.icon}
//                         <span className="ml-2">{skill?.name}</span>
//                         <button
//                           onClick={() => toggleSkill(skillId)}
//                           className="ml-2 text-indigo-600 hover:text-indigo-800"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </span>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Skills Dropdown */}
//               <div className="relative mb-6">
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="w-full px-4 py-3 text-left text-gray-700 bg-white border-2 border-gray-200
//                            rounded-lg hover:border-indigo-300 focus:outline-none focus:border-indigo-500"
//                 >
//                   Select Technical Skills
//                 </button>

//                 {isDropdownOpen && (
//                   <div
//                     className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg
//                                 shadow-lg max-h-60 overflow-y-auto"
//                   >
//                     {technicalSkills.map((skill) => (
//                       <button
//                         key={skill.id}
//                         onClick={() => {
//                           toggleSkill(skill.id);
//                           setIsDropdownOpen(false);
//                         }}
//                         className={`w-full px-4 py-3 text-left flex items-center hover:bg-gray-50
//                                 ${
//                                   selectedSkills.includes(skill.id)
//                                     ? "bg-indigo-50"
//                                     : ""
//                                 }`}
//                       >
//                         {skill.icon}
//                         <span className="ml-2">{skill.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Start Button */}
//               <button
//                 onClick={handleStartInterview}
//                 disabled={selectedSkills.length === 0}
//                 className={`w-full px-6 py-3 rounded-lg font-semibold transition
//                          ${
//                            selectedSkills.length > 0
//                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                          }`}
//               >
//                 Start Interview
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
