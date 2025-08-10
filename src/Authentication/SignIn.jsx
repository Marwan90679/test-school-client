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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
 console.log(location)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading} = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      navigate(location.state || "/");
    } catch (err) {
      console.error("Auth error:", err);
      setError("Sign In failed. Please check your email and password.");
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
            Welcome Back!
          </h2>
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-900 bg-opacity-30 rounded-lg">
              <XCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleFormSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-800 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              Sign In
            </button>
          </form> 
          <p className="text-center text-sm text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
