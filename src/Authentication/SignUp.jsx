import React, { useState, useContext } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  XCircle,
  Loader2,
  Home,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";






const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, loading, setLoading, updateUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading
    const payload = {
      name,
      email,
      password,
      role,
      avatarUrl,
    };
    try { 

      await createUser(email, password);
      // Update the user's profile with the name and avatar URL
      await updateUserInfo({ displayName: name, photoURL: avatarUrl });

      const response = await fetch("http://localhost:5000/signUp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle server-side errors (e.g., user already exists)
        throw new Error(result.message || "Failed to sign up.");
      }
      // Navigate to dashboard or home on success
      navigate('/')
    } catch (err) {
      console.error("Auth error:", err);
      setError("Sign Up failed. Please try again.");
    } finally {
        setLoading(false); // Always stop loading, whether successful or not
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-md p-8 bg-gray-900 shadow-2xl rounded-2xl border border-gray-700 animate-fade-in relative">
        <Link
          to="/"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <Home size={20} />
        </Link>
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-white">
            Create Your Account
          </h2>
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-900 bg-opacity-30 rounded-lg">
              <XCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email Input */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Password Input */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Role Selection */}
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="Student">Student</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>
            {/* Avatar URL Input */}
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Avatar URL (optional)"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-800 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-400">
            Already have an account?
            <Link
              to="/signin"
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
