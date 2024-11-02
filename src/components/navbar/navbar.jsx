import React, { useState } from "react";
import { Menu } from "./navUI"; 
import { cn } from "../../lib/utils";
import { IoHome, IoCloseSharp, IoMenu, IoSettings } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { GrAchievement } from "react-icons/gr";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { GiJourney } from "react-icons/gi";
import { Link } from "react-scroll";  // Import from react-scroll for smooth scrolling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import img from "../../assets/sg1.png"

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    
    <div className={cn("fixed inset-x-0 max-w-full mx-auto z-50", className)}>
      <div className="w-full bg-black xl:hidden flex items-center justify-between px-4 py-2"> {/* Added flex layout and padding */}
        <a href="#" className="text-white">
          <img 
            src={img} 
            alt="" 
            className="h-8 w-13 bg-transparent xl:hidden rounded-md" 
            style={{ backgroundColor: 'transparent' }} 
          />
        </a>

        <button 
        className="block xl:hidden text-[#ff1818] p-2 rounded-md" 
        onClick={() => setIsDrawerOpen(true)}
        > 
        <IoMenu className="text-4xl bg-transparent" />
        </button>
      </div>



      {/* Drawer for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } xl:hidden z-50`}
      >
        
        <div className="w-full bg-black h-full p-12 text-2xl flex">
        
          <button
            className="text-white text-xl absolute top-4 right-4"
            onClick={() => setIsDrawerOpen(false)}
          >
            <IoCloseSharp className="text-4xl"/>
          </button>
        
          <div className="flex flex-col space-y-4">
            <Link
              to="home"
              smooth={true}
              duration={1000}
              className="text-white transition-colors duration-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <IoHome className="inline-block mr-2 mb-2" />
              Home
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={1000}
              className="text-white transition-colors duration-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <TbReportAnalytics className="inline-block mr-2 mb-2" />
              Projects
            </Link>
            <Link
              to="achievements"
              smooth={true}
              duration={1000}
              className="text-white transition-colors duration-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <TfiAnnouncement className="inline-block mr-2 mb-2" />
              Achievements
            </Link>
            <Link
              to="journey"
              smooth={true}
              duration={1000}
              className="text-white transition-colors duration-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <GiJourney className="inline-block mr-2 mb-2" />
              Journey
            </Link>
            
            < a className="bg-[#fff] text-[#000] px-3 py-1 rounded-full flex items-center transition-shadow duration-300 hover:shadow-md font-semibold hover:shadow-white" href="https://api.whatsapp.com/send?phone=916295894643">
            <FontAwesomeIcon 
            icon={faWhatsapp} 
            style={{ color: "#0fd79b" }} 
            className="mr-2 bg-[#fff]" // Add margin to the right of the icon
            />
            Let's connect
        </a>
          </div>
        </div>
      </div>

    {/* Full Navbar for larger screens */}
    <div className="hidden xl:flex items-center space-x-6 bg-transparent">
    <Menu>
    <div className="bg-transparent">
  <div className="absolute bg-transparent left-8">
    <a href="#" className="text-white bg-transparent">
    <img src={img} alt="" className="h-8 w-13 xl:inline-block bg-transparent" />
    </a>
  </div>
</div>

    <Link
      to="home"
      smooth={true}
      duration={1000}
      className="text-white bg-transparent hover:text-slate-300 transition-colors duration-300 font-semibold pt-0.5 cursor-pointer"
    >
      <IoHome className="inline-block bg-transparent mr-2 mb-1 hidden 2xl:inline-block" />
      Home
    </Link>
    <Link
      to="projects"
      smooth={true}
      duration={1000}
      className="text-white transition-colors bg-transparent duration-300 font-semibold pt-0.5 cursor-pointer hover:text-slate-300"
    >
      <TbReportAnalytics className="inline-block bg-transparent mr-2 mb-1 hidden 2xl:inline-block" />
      Projects
    </Link>
    <Link
      to="achievements"
      smooth={true}
      duration={1000}
      className="text-white transition-colors bg-transparent duration-300 font-semibold pt-0.5 cursor-pointer hover:text-slate-300"
    >
      <GrAchievement className="inline-block mr-2 bg-transparent mb-1 hidden 2xl:inline-block" />
      Achievements
    </Link>
    <Link
      to="journey"
      smooth={true}
      duration={1000}
      className="text-white transition-colors bg-transparent duration-300 font-semibold pt-0.5 cursor-pointer hover:text-slate-300"
    >
      <GiJourney className="inline-block bg-transparent mr-2 mb-1 hidden 2xl:inline-block" />
      Journey
    </Link>
    <a className="bg-[#fff] text-[#111] px-3 py-1 rounded-full flex items-center transition-shadow duration-300 hover:shadow-md font-semibold hover:shadow-slate-400 cursor-pointer " href="https://api.whatsapp.com/send?phone=916295894643">
      <FontAwesomeIcon 
        icon={faWhatsapp} 
        style={{ color: "#0fd79b" }} 
        className="mr-2 bg-[#fff]" // Add margin to the right of the icon
      />
      Let's connect
    </a>
  </Menu>
</div>

    </div>
  );
}


