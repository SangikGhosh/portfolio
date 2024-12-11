import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis"; // Import Lenis
import img from "../assets/removebg2.png";
import FollowerPointerCard from "../components/custompointer/curser";


const Homepage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 2, // Duration of the smooth scroll effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smooth: true,
    });

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);

    return () => {
      lenis.destroy(); // Cleanup Lenis on component unmount
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const containerVariants = {
    hidden: {},
    visible: prefersReducedMotion
      ? {}
      : {
          transition: {
            staggerChildren: 0.05,
          },
        },
  };

  const wordVariants = {
    hidden: { x: prefersReducedMotion ? 0 : 50, opacity: 0, filter: "blur(10px)" },
    visible: prefersReducedMotion
      ? { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.3 } }
      : { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
  };

  const animatedParagraph = (text) =>
    text.split(" ").map((word, index) => (
      <motion.p
        key={index}
        className="inline-block bg-transparent text-gray-300"
        variants={wordVariants}
      >
        {word}&nbsp;
      </motion.p>
    ));

  return (
    <div className="relative bg-transparent w-full h-screen overflow-hidden">
    
      {/* Content */}
      <div id="home" className="home"></div>
      <section className="flex bg-transparent flex-col-reverse lg:flex-row items-center bg-black bg-opacity-50 lg:pt-0 pt-6 text-white px-6 md:px-12 lg:px-0 xl:px-14">
        <div className="flex flex-col items-start w-full lg:w-2/3 lg:pl-[9rem] z-[2] bg-transparent">
          <motion.h3
            className="text-yellow-400 text-sm md:text-base lg:text-lg uppercase tracking-widest bg-transparent"
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Hello!!
          </motion.h3>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 bg-transparent"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            I'm
            <motion.span
              className="inline-block bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r sm:py-3 from-blue-600 via-violet-600 to-pink-600"
              variants={wordVariants}
            >
              &nbsp;Sangik&nbsp;Ghosh
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl bg-transparent"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {animatedParagraph(
              "I'm a dedicated software developer with expertise in backend systems using Java, Android app development, and the latest in web technologies. I’m passionate about crafting efficient, innovative solutions that address real-world challenges."
            )}
          </motion.p>
          <motion.p
            className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl bg-transparent"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {animatedParagraph(
              "Creating powerful, seamless solutions across mobile, web, and backend with a drive for excellence."
            )}
          </motion.p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 bg-transparent">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="bg-gradient-to-r tracking-tight from-blue-600 to-purple-600 text-black font-semibold py-2 px-6 rounded-full transform transition duration-300 hover:brightness-110"
            >
              SAY HELLO👋
            </a>
            <a
              href="#projects"
              className="border text-center border-gray-300 text-gray-300 font-semibold py-2 px-6 rounded-full hover:border-sky-400 hover:text-white transform transition duration-600"
            >
              My Works
            </a>
          </div>
        </div>
        <div className="w-full md:pt-24 lg:pt-40 pt-4 lg:w-1/2 flex justify-center lg:justify-end lg:items-start mb-8 lg:mb-0 md:pr-10 lg:pr-[5rem] rounded-full bg-transparent pb-0 lg:pb-[12rem]">
          <FollowerPointerCard className="rounded-full bg-transparent">
            <img
              src={img}
              alt="Sangik Ghosh"
              className="w-64 h-64 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[35rem] lg:h-[35rem] object-cover rounded-full mt-0 md:mt-[-4rem] lg:mt-0 bg-transparent"
            />
          </FollowerPointerCard>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
