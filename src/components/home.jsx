import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import img from "../assets/removebg2.png";
import PropTypes from 'prop-types';
import FollowerPointerCard from "../components/custompointer/curser";
import bgVideo from "../assets/starbg.mp4"; // Add your video file path here

const Homepage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  // Variants for animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  const wordVariants = {
    hidden: { x: 50, opacity: 0, filter: "blur(10px)" },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const splitText = (text, gradientWords = []) => text.split(' ').map((word, index) => (
    <motion.span
      key={index}
      className={`inline-block ${gradientWords.includes(word) ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 pb-4' : ''}`}
      variants={wordVariants}
    >
      {word}&nbsp;
    </motion.span>
  ));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full opacity-50 object-cover z-[0]"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Content */}
      <div id='home' className="home"></div>
      <section className="flex flex-col-reverse lg:flex-row items-center bg-black bg-opacity-50 lg:pt-0 pt-6 text-white px-6 md:px-12 lg:px-0 xl:px-14">
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
              className="inline-block bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-blue-600 via-violet-600 to-pink-600"
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
            {splitText("I'm a dedicated software developer with expertise in backend systems using Java, Android app development, and the latest in web technologies. I’m passionate about crafting efficient, innovative solutions that address real-world challenges.")}
          </motion.p>
          <motion.p
            className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl bg-transparent"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {splitText("Creating powerful, seamless solutions across mobile, web, and backend with a drive for excellence.")}
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
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#projects');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
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