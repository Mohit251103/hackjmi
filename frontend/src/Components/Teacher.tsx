import { Bell, Calendar, MessageSquare, Users2, Video } from "lucide-react";

// Mock data for notifications
const notifications = [
  {
    id: 1,
    candidate: "Sarah Wilson",
    role: "Frontend Developer",
    time: "10 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    candidate: "Michael Chen",
    role: "Full Stack Developer",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: 3,
    candidate: "Emma Thompson",
    role: "UI/UX Designer",
    time: "2 hours ago",
    status: "pending",
  },
];

// Mock interviewer data
const interviewer = {
  name: "Dr. John Smith",
  role: "Senior Technical Interviewer",
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "System Design",
    "Data Structures",
  ],
  interviews_conducted: 142,
  rating: 4.9,
};

function Teacher() {
  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Interviewer Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {interviewer.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Left Section - 70% */}
        <div className="w-[70%] bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {interviewer.name}
              </h2>
              <p className="text-gray-600 mt-1">{interviewer.role}</p>

              <div className="mt-6 flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Users2 className="w-5 h-5 mr-2" />
                  <span>{interviewer.interviews_conducted} Interviews</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{interviewer.rating} Rating</span>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Join Interview
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {interviewer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
              alt="Interview illustration"
              className="w-full h-[300px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Section - 30% */}
        <div className="w-[30%] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Interview Requests</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {notifications.length} New
            </span>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {notification.candidate}
                    </h4>
                    <p className="text-sm text-gray-600">{notification.role}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 flex items-center justify-center text-gray-600 hover:text-gray-900">
            <MessageSquare className="w-4 h-4 mr-2" />
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
