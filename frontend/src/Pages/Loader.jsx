import logo from "../assets/favicon.svg"
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-2 border-red-700 border-t-transparent animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt="HHO Logo"
            className="w-28 h-28 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;