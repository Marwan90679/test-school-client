import React from 'react';
import heroImg from '../assets/Pink Colorful Home Quiz Presentation.png'
import { Link } from 'react-router';
const Hero = () => {
    return (
        <div>
           <div style={{backgroundImage: `url(${heroImg})`, backgroundSize:'cover',backgroundPosition:'center'}} className='min-h-screen'>
           <div className='text-center '>
           <h3 className='text-2xl lg:text-6xl lg:pt-34 pt-8 font-bold'>Welcome to <span>Quiz TEST</span></h3>
           <button className='btn my-3 bg-blue-700  text-white rounded-lg px-3 py-2'><Link to='/levelSelection'>
           Join Quiz</Link></button>
           </div>
           </div>
        </div>
    );
};

export default Hero;