import Logo from "../../assets/HHO-logo.png";

const PublicNavbar = ({ setView, activeView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="HHO Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-xl font-bold text-red-900">
          Helping Hands Organization
        </h1>
      </div>

      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        <button onClick={() => setView("home")} className={`hover:text-red-900 font-semibold`}>Home</button>
        <button onClick={() => setView("campaigns")} className={`font-semibold ${activeView === "campaigns" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Campaigns</button>
        <button onClick={() => setView("events")} className={`font-semibold ${activeView === "events" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Events</button>
        <button onClick={() => setView("gallery")} className={`font-semibold ${activeView === "gallery" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>Gallery</button>
        <button onClick={() => setView("about")} className={`font-semibold ${activeView === "about" ? "text-red-900 font-bold" : "hover:text-red-900"}`}>About</button>
        <button
          onClick={() => setView("signin")}
          className="bg-red-900 text-white px-4 py-1.5 rounded hover:bg-red-700 font-semibold"
        >
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;