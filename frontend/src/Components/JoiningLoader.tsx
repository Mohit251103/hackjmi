const JoiningLoader = () => {
  return (
    <div className="sticky h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="relative mb-8">
        {/* Human characters SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          className="text-blue-600 animate-pulse"
        >
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
            fill="currentColor"
          />
          <path
            d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"
            fill="currentColor"
          />
          <path
            d="M4.5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm15 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M4.5 9.5c-3.32 0-4.5 1.34-4.5 3v2h4v-2c0-1.06.39-2.07 1.12-2.98A8.5 8.5 0 0 0 4.5 9.5zm15 0c-.35 0-.69.02-1.12.02.73.91 1.12 1.92 1.12 2.98v2h4v-2c0-1.66-1.18-3-4.5-3z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>

        {/* Ripple effects */}
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
        <div className="absolute inset-0 animate-ping delay-200 rounded-full bg-blue-400 opacity-10" />
      </div>

      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />

      <div className="text-xl font-semibold text-gray-700 flex items-center mb-2">
        Connecting to call
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-bounce mx-0.5"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            .
          </span>
        ))}
      </div>

      <p className="text-gray-500 text-sm">Setting up your video connection</p>
    </div>
  );
};

export default JoiningLoader;
