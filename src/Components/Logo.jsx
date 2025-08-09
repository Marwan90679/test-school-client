import { GraduationCap } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Link to='/'>
        {" "}
        <div className="p-2 bg-blue-600 rounded-lg">
          <GraduationCap className="h-8 w-8 mx-auto text-white" />
        </div>
          <h1 className="text-2xl font-bold">Test School</h1> 
      </Link>
    </div>
  );
};

export default Logo;
