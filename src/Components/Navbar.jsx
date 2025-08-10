import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

import { LogOut } from "lucide-react";
import { AuthContext } from "../Contexts/AuthContext";

// New UserAvatar component to handle the image and fallback logic
const UserAvatar = ({ displayName, photoURL }) => {
  const [imageError, setImageError] = useState(false);

  // Get initials from display name
  const initials = displayName
    ? displayName.split(' ').slice(0, 2).map(name => name[0]).join('')
    : '?';

  // Reset image error state if photoURL changes
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
  // Get user and loading state from the AuthContext
  const { user, loading } = useContext(AuthContext);
  
  // A simple placeholder avatar URL (now handled by the UserAvatar component fallback)
  // const placeholderAvatar = "https://placehold.co/40x40/2d3748/ffffff?text=U";

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white hover:text-gray-300 transition-colors">
          <Logo/>
        </Link>
        
        <div className="flex gap-3 items-center">
          {loading ? (
            <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
          ) : user ? (
            <>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Dashboard
              </button>
          
              <Link to='/certificates'>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Certificates 
                </button>
              </Link>
              <button
                onClick={user.signOut}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
              <div className="flex items-center">
                <UserAvatar displayName={user.displayName} photoURL={user.photoURL} />
              </div>
            </>
          ) : (
            <>
              <Link to='/signIn'>
                <button className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
                  Sign In
                </button>
              </Link> 
              <Link to='/signUp'>
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
