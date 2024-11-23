import React from 'react';
import img from "../assets/removebg.png";
import PropTypes from 'prop-types';
import FollowerPointerCard from "../components/custompointer/curser";
import bgVideo from "../assets/video.mp4"; // Add your video file path here
import { useRef, useEffect } from 'react';
const Homepage = () => {
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Set your desired playback speed here
    }
  }, []);
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-[0]"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Content */}
      <div className="home"></div>
      <section className="flex flex-col-reverse lg:flex-row items-center bg-black bg-opacity-50 pt-6 text-white px-6 md:px-12 lg:px-0 xl:px-14">
        <div className="flex flex-col items-start w-full lg:w-1/2 lg:pl-[9rem] z-[2] bg-transparent">
          <h3 className="text-yellow-500 text-sm md:text-base lg:text-lg uppercase tracking-widest bg-transparent">Hello!!</h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 bg-transparent">
            I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Sangik Ghosh
            </span>
          </h1>
          <p className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl bg-transparent">
            I'm a dedicated software developer with expertise in backend systems using Java, Android app development, and
            the latest in web technologies. I’m passionate about crafting efficient, innovative solutions that address
            real-world challenges.
          </p>
          <p className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl bg-transparent">
            Creating powerful, seamless solutions across mobile, web, and backend with a drive for excellence.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 bg-transparent">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="bg-gradient-to-r tracking-widest from-blue-500 to-purple-500 text-black font-semibold py-2 px-6 rounded-full transform transition duration-300 hover:opacity-90"
            >
              SAY HELLO👋
            </a>
            <a
              href="#my-works"
              className="border text-center border-gray-300 text-gray-300 font-semibold py-2 px-6 rounded-full hover:border-sky-400 hover:text-white transform transition duration-600"
            >
              My Works
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:items-start mb-8 lg:mb-0 pr-4 md:pr-10 lg:pr-[5rem] rounded-full bg-transparent pb-0 lg:pb-[12rem]">
          <FollowerPointerCard className="rounded-full bg-transparent">
            <img
              src={img}
              alt="Sangik Ghosh"
              className="w-64 h-64 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[42rem] lg:h-[42rem] object-cover rounded-full mt-0 md:mt-[-4rem] lg:mt-0 bg-transparent"
            />
          </FollowerPointerCard>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
