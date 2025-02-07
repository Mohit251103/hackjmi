import {
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Globe,
  Github,
  Twitter,
  Award,
  MessageSquare,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";

function ProfilePage() {
  return (
    <div className="  max-h-screen bg-gray-100">
      {/* Header/Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800" />

      <main className="max-w-4xl mx-auto -mt-24 pb-16">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                />
                <h1 className="text-3xl font-bold mt-4">John Doe</h1>
                <p className="text-xl text-gray-600 mt-1">
                  Senior Software Engineer at Tech Corp
                </p>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>San Francisco Bay Area</span>
                </div>
                <div className="flex items-center gap-4 mt-4 text-blue-600">
                  <a href="#" className="flex items-center hover:underline">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>Message</span>
                  </a>
                  <a href="#" className="flex items-center hover:underline">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>website.com</span>
                  </a>
                  <a href="#" className="flex items-center hover:underline">
                    <Github className="w-4 h-4 mr-1" />
                    <span>Github</span>
                  </a>
                  <a href="#" className="flex items-center hover:underline">
                    <Twitter className="w-4 h-4 mr-1" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </button>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full flex items-center hover:bg-blue-50">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-600">
            Passionate software engineer with 8+ years of experience in
            full-stack development. Specialized in building scalable web
            applications and microservices architecture. Strong advocate for
            clean code and best practices.
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Experience
          </h2>
          <div className="space-y-6">
            {[
              {
                role: "Senior Software Engineer",
                company: "Tech Corp",
                period: "2020 - Present",
                description:
                  "Leading development of cloud-native applications using React and Node.js.",
              },
              {
                role: "Software Engineer",
                company: "StartUp Inc",
                period: "2018 - 2020",
                description:
                  "Developed and maintained multiple client-facing applications.",
              },
            ].map((exp, index) => (
              <div
                key={index}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">{exp.period}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                Master of Computer Science
              </h3>
              <p className="text-gray-600">Stanford University</p>
              <p className="text-gray-500 text-sm">2016 - 2018</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Python",
              "AWS",
              "Docker",
              "Kubernetes",
              "GraphQL",
              "REST APIs",
              "System Design",
              "Agile Methodologies",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
