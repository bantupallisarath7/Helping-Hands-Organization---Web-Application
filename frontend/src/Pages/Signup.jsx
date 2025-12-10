import { useState } from "react";
import axios from "axios";

const Signup = ({ setView }) => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formFields.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formFields.email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
      setError("Email is invalid");
      return false;
    }
    if (!formFields.password) {
      setError("Password is required");
      return false;
    } else if (formFields.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate signup success
      setLoading(true)
      try {
        const res = await axios.post("http://localhost:8815/auth/signup",
          {
            fullName: formFields.username,
            email: formFields.email,
            password: formFields.password
          },
          {
            withCredentials: true
          });
        if (res.data.success === false) {
          setError(res.data.message);
          setLoading(false)
          return
        }
        setError("")
        console.log("Signup successful:", formFields);
        setView("signin");
      } catch (error) {
        console.log(error.message);
        setError(error.message)
      }
      setLoading(false)
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 pt-20">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <form onSubmit={submitHandler} className="space-y-4">
          <h4 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h4>

          <input
            type="text"
            value={formFields.username}
            placeholder="Username"
            onChange={(e) => setFormFields({ ...formFields, username: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-900"
          />

          <input
            type="text"
            value={formFields.email}
            placeholder="Email"
            onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-900"
          />

          <input
            type="password"
            value={formFields.password}
            placeholder="Password"
            onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-900"
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setView("signin")}
              className="font-medium text-red-900 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;