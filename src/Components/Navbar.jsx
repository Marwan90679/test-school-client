import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

import { LogOut } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";

const UserAvatar = ({ displayName, photoURL }) => {
  const [imageError, setImageError] = useState(false);

  const initials = displayName
    ? displayName
        .split(" ")
        .slice(0, 2)
        .map((name) => name[0])
        .join("")
    : "?";

  useEffect(() => {
    setImageError(false);
  }, [photoURL]);

  if (photoURL && !imageError) {
    return (
      <img
        src={photoURL}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-white font-bold border-2 border-blue-500">
      {initials}
    </div>
  );
};

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    try {
      logOut();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex gap-3 items-center">
          {loading ? (
            <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
          ) : user ? (
            <>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Dashboard
              </button>

              <Link to="/certificates">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Certificates
                </button>
              </Link>

              <div className="flex items-center">
                <UserAvatar
                  displayName={user.displayName}
                  photoURL={user.photoURL}
                />
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signUp">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
