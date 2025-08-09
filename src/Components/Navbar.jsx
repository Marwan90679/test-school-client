import React from "react";
import { Link } from "react-router";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <header className="container mx-auto px-6 py-6 flex items-center justify-between"> 
    <Logo/>
     <div className="flex gap-3"> 
       <Link to='/signIn'><button className="border px-4 py-2 rounded">Sign In</button></Link> 
       <Link to='/singUp'><button className="px-4 py-2 rounded bg-blue-600 text-white">Get Started</button> </Link>
     </div> 
   </header> 
  );
};

export default Navbar;
