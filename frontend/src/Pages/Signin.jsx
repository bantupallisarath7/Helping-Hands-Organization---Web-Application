import { useState } from "react";
import { useDispatch } from "react-redux"
import axios from "axios";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { toast } from "react-toastify";

const Signin = ({ setView, onLogin }) => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
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
    if (formFields.role === "") {
      setError("Select the role");
      return false;
    }
    setError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Signin api
      setLoading(true);
      try {
        dispatch(signInStart())
        const res = await axios.post("http://localhost:8815/auth/signin",
          {
            email: formFields.email,
            password: formFields.password,
            role: formFields.role
          },
          { withCredentials: true }
        );
        if (res.data.success === false) {
          toast.error(res.data.message)
          dispatch(signInFailure(res.data.message))
          setLoading(false);
          return
        }
        dispatch(signInSuccess(res.data.user));
        toast.success(res.data.message)
        setView("dashboard");
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMsg);
        dispatch(signInFailure(error.message));
      }
      setLoading(false);
      onLogin(formFields.role);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 pt-20">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <form onSubmit={submitHandler} className="space-y-4">
          <h4 className="text-2xl font-semibold text-center text-gray-800">Sign In</h4>

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

          <div className="flex justify-center items-center space-x-6 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formFields.role === "user"}
                onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                className="accent-red-900"
              />
              <span className="ml-2 text-gray-700 font-medium">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formFields.role === "admin"}
                onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                className="accent-red-900"
              />
              <span className="ml-2 text-gray-700 font-medium">Admin</span>
            </label>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Not registered yet?{" "}
            <button
              type="button"
              onClick={() => setView("signup")}
              className="font-medium text-red-900 hover:underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;