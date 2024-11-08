import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import img from "react-bootstrap/img";
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
    <div onMouseEnter={() => setActive(item) 
    } className="relative bg-transparent">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-white bg-transparent font-semibold pt-1"
      >
        {item}
      <IoIosArrowDown className="inline-block bg-transparent text-white ml-2"/>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.6rem)] left-1/2 transform bg-transparent -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, active, children }) => {
    return (
      <nav
        onMouseLeave={() => setActive(null)}
        className="fixed top-5 left-1/2 transform -translate-x-1/2 w-1/2 z-50 border border-white/[0.5] bg-custom-white-transparent backdrop-blur-lg openNavigation flex justify-end  gap-8 px-4 py-3 rounded-full"
      >
        {children}
      </nav>
    );
  };
  

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-2 ">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl  font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
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
      className="text-neutral-700 dark:text-neutral-200 hover:text-blue-500"
    >
      {children}
    </Link>
  );
};
