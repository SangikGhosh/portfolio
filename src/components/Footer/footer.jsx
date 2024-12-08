import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaArrowRightLong } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="font-bold text-2xl text-blue-700 mb-3">About</h3>
          <p className="text-gray-400 mb-4">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
          </p>
          <div className="flex space-x-3">
            <a href="https://x.com/Sangik_Ghosh" target='_blank' className="p-2 bg-gray-700 rounded-full">
              <FaTwitter className='bg-gray-700'/>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088473806630" target='_blank' className="p-2 bg-gray-700 rounded-full">
              <FaFacebookF className='bg-gray-700'/>
            </a>
            <a href="https://www.instagram.com/s.a.n.g.i.k_/" target='_blank' className="p-2 bg-gray-700 rounded-full">
              <FaInstagram className='bg-gray-700'/>
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="font-bold text-2xl text-blue-700 mb-3">Links</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="#home" 
                className="text-gray-400 hover:text-green-500 group block transition-colors duration-0"
                  onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document.querySelector('#home')?.scrollIntoView({ 
                    behavior: 'smooth' // Enable smooth scroll 
                  });
                }}
                >
                <span className="block pl-0 group-hover:pl-2 transition-all duration-200">
                  Home
                </span>
              </a>
            </li>
            <li>
              <a 
                href="#aboutMe" 
                className="text-gray-400 hover:text-green-500 group block transition-colors duration-0"
                  onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document.querySelector('#aboutMe')?.scrollIntoView({ 
                    behavior: 'smooth' // Enable smooth scroll 
                  });
                }}
                >
                <span className="block pl-0 group-hover:pl-2 transition-all duration-200">
                  About
                </span>
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className="text-gray-400 hover:text-green-500 group block transition-colors duration-0"
                                  onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document.querySelector('#projects')?.scrollIntoView({ 
                    behavior: 'smooth' // Enable smooth scroll 
                  });
                }}
                >
                <span className="block pl-0 group-hover:pl-2 transition-all duration-200">
                  Projects
                </span>
              </a>
            </li>
            <li>
              <a 
                href="#achievements" 
                className="text-gray-400 hover:text-green-500 group block transition-colors duration-0"
                  onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document.querySelector('#achievements')?.scrollIntoView({ 
                    behavior: 'smooth' // Enable smooth scroll 
                  });
                }}
                >
                <span className="block pl-0 group-hover:pl-2 transition-all duration-200">
                Achievements
                </span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-400 hover:text-green-500 group block transition-colors duration-0"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document.querySelector('#contact')?.scrollIntoView({ 
                    behavior: 'smooth' // Enable smooth scroll 
                  });
                }}
              >
                <span className="block pl-0 group-hover:pl-2 transition-all duration-200">
                  Contact
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="font-bold text-2xl text-blue-700 mb-3">Services</h3>
          <ul className="space-y-2 cursor-pointer">
            <li className="text-gray-400 hover:text-green-500 group block transition-colors duration-0">
                <span className="block pl-0 group-hover:pl-2 transition-all duration-300">
                Web Design
                </span>
            </li>
            <li className="text-gray-400 hover:text-green-500 group block transition-colors duration-0">
                <span className="block pl-0 group-hover:pl-2 transition-all duration-300">
                Web Development
                </span>
            </li>
            <li className="text-gray-400 hover:text-green-500 group block transition-colors duration-0">
                <span className="block pl-0 group-hover:pl-2 transition-all duration-300">
                Business Strategy
                </span>
            </li>
            <li className="text-gray-400 hover:text-green-500 group block transition-colors duration-0">
                <span className="block pl-0 group-hover:pl-2 transition-all duration-300">
                 Data Analysis
                </span>
            </li>
            <li className="text-gray-400 hover:text-green-500 group block transition-colors duration-0">
                <span className="block pl-0 group-hover:pl-2 transition-all duration-300">
                Graphic Design
                </span>
            </li>
          </ul>
        </div>


        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-2xl text-blue-700 mb-3">Have a Questions?</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <span className="mr-2">📍</span> 17/K/25 Ultadanda, North 24 Parganas, West Bengal, India 
            </li>
            <li className="flex items-center">
              <span className="mr-2">📞</span> +91 62958 94643
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧</span> sangik.ghosh1@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        <p>
          Copyright ©2024 All rights reserved | This template is made with ❤️ by Sangik Ghosh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
