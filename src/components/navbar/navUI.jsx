import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-text-secondary hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors duration-300"
      >
        {item}
        <IoIosArrowDown 
          className={`text-xs transition-transform duration-300 ${active === item ? 'rotate-180' : ''}`}
        />
      </motion.p>
      <AnimatePresence>
        {active === item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={transition}
          >
            <div className="absolute top-[calc(100%_+_1rem)] left-1/2 -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="glass-card p-4 min-w-[180px] shadow-glass"
                style={{
                  background: 'rgba(17, 17, 24, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                }}
              >
                <motion.div layout className="w-max h-full">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full flex items-center justify-center gap-8"
      style={{
        background: 'rgba(10, 10, 15, 0.75)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-lg"
      />
      <div>
        <h4 className="text-base font-semibold mb-1 text-white">
          {title}
        </h4>
        <p className="text-text-secondary text-sm max-w-[10rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="text-text-secondary hover:text-accent-cyan transition-colors duration-300"
    >
      {children}
    </Link>
  );
};
