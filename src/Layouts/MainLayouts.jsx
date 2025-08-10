import React, { useContext } from 'react';

import { Outlet } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import Navbar from '../Components/Navbar';

const MainLayouts = () => {
    // Get the loading state from the AuthContext
    const { loading } = useContext(AuthContext);

   
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <>
            <Navbar/>
            <div className="min-h-screen ">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayouts;
