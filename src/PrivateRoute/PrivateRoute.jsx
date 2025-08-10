import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

import { Loader2 } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation();

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <Loader2 className="animate-spin" size={48} />
    </div>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
