import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "./navUI";
import { cn } from "../../lib/utils";
import { IoHome, IoCloseSharp, IoMenu } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaAccusoft } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { GiJourney } from "react-icons/gi";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import img from "../../assets/sg1.png";
import { MdGroups } from "react-icons/md";
import { ImEmbed2 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "home", label: "Home", icon: IoHome },
    { to: "aboutMe", label: "About", icon: FaAccusoft },
    { to: "projects", label: "Projects", icon: TbReportAnalytics },
  ];

  const otherLinks = [
    { to: "ourTeam", label: "Our Team", icon: MdGroups },
    { to: "achievements", label: "Achievements", icon: GrAchievement },
    { to: "skills", label: "Skills", icon: ImEmbed2 },
    { to: "journey", label: "Journey", icon: GiJourney },
  ];

  return (
    <div className={cn("fixed inset-x-0 max-w-full mx-auto z-50", className)}>
      {/* Mobile Header */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full xl:hidden flex items-center justify-between px-5 py-4"
        style={{
          background: scrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <a href="#" className="relative z-10">
          <img 
            src={img} 
            alt="Logo" 
            className="h-9 w-auto rounded-lg" 
          />
        </a>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 p-2.5 rounded-xl transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          onClick={() => setIsDrawerOpen(true)}
        > 
          <IoMenu className="text-2xl text-white" />
        </motion.button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm xl:hidden z-50"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full xl:hidden z-50"
              style={{
                background: 'rgba(10, 10, 15, 0.95)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-white font-semibold text-lg">Menu</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <IoCloseSharp className="text-xl text-white"/>
                  </motion.button>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {[...navLinks, ...otherLinks].map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        smooth={true}
                        duration={1000}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <link.icon className="text-xl text-accent-cyan group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-6"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <a 
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-bg-primary transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                    }}
                    href="https://api.whatsapp.com/send?phone=916295894643"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                    {"Let's Connect"}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="hidden xl:flex items-center justify-center pt-6"
      >
        <Menu setActive={setActive}>
          <div className="absolute left-6">
            <a className="text-white">
              <img src={img} alt="Logo" className="h-8 w-auto rounded-md" />
            </a>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={1000}
              className="text-text-secondary hover:text-white transition-colors duration-300 font-medium text-sm cursor-pointer flex items-center gap-1.5"
            >
              <link.icon className="text-accent-cyan hidden 2xl:inline-block" />
              {link.label}
            </Link>
          ))}
          
          <MenuItem setActive={setActive} active={active} item="Others">
            <div className="flex flex-col space-y-3">
              {otherLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={1000}
                  className="text-text-secondary hover:text-accent-cyan transition-colors duration-300 font-medium cursor-pointer flex items-center gap-3"
                >
                  <link.icon className="text-accent-cyan" />
                  {link.label}
                </Link>
              ))}
            </div>
          </MenuItem>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ml-4 px-5 py-2 rounded-full flex items-center gap-2 font-semibold text-sm transition-all duration-300 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
              color: '#0a0a0f',
            }}
            href="https://api.whatsapp.com/send?phone=916295894643"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            {"Let's Connect"}
          </motion.a>
        </Menu>
      </motion.div>
    </div>
  );
}
