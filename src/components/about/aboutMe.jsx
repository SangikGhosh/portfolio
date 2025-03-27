import React, { useEffect, useState, useRef } from 'react';
import img from "../../assets/removebg.png";
import { TextHoverEffect } from '../GlowText/ui';

const AboutMe = () => {
  const [projectCount, setProjectCount] = useState(0);
  const targetProjectCount = 12;
  const animationDuration = 1000;
  const sectionRef = useRef(null);

  const animateCount = () => {
    let startTime;

    const countUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / animationDuration, 1);
      const currentCount = Math.floor(progress * targetProjectCount);

      setProjectCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(countUp);
      }
    };

    requestAnimationFrame(countUp);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectCount(0); // Reset count
          animateCount(); // Start the count animation
        }
      },
      { threshold: 0.5 } // Adjust this threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        id="aboutMe"
        className="aboutMe flex items-center justify-center bg-black text-white px-4 md:px-6 lg:px-8 xl:px-0 min-h-screen"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8 max-w-5xl w-full md:justify-center lg:justify-between lg:items-center">
          {/* Image Section - Visible only on large screens and above */}
          <div className="relative hidden lg:block">
            <img
              src={img}
              alt="Sangik Ghosh"
              className="w-[20rem] h-[28rem] lg:w-[30rem] lg:h-[42rem] object-cover mt-0 mb-44"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-6 text-left pl-2 sm:pl-16 w-full md:w-auto md:text-left">
            <TextHoverEffect className="left-0" text="About Me" fontSize="4xl" strokeWidth={1} />

            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-[1.15rem] max-w-md">
              I am a dedicated software developer with expertise in Java, Android app development, and modern web technologies.
            </p>

            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-x-0 gap-y-2 text-gray-400 text-sm sm:text-base md:text-lg lg:text-[1.15rem]">
              <span className="text-white font-semibold">Name:</span>
              <span>Sangik Ghosh</span>

              <span className="text-white font-semibold">Date of Birth:</span>
              <span>December 31, 2004</span>

              <span className="text-white font-semibold">Address:</span>
              <span>Kolkata, West Bengal, India</span>

              <span className="text-white font-semibold">Zip Code:</span>
              <span>700048</span>

              <span className="text-white font-semibold">Email:</span>
              <span>sangik.ghosh1@gmail.com</span>

              <span className="text-white font-semibold">Phone:</span>
              <span>+91 6295894643</span>
            </div>

            {/* Projects and Download Button */}
            <div className="pt-4">
              <p className="text-lg sm:text-xl md:text-2xl">
                <span className="font-bold text-yellow-500">{projectCount}</span> Project complete
              </p>
              <div className="pt-4">
                <a href="https://www.canva.com/design/DAGb6Dz0bSE/qcV2wlUYbogTpQSqTI0aQg/view?utm_content=DAGb6Dz0bSE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1a00f338ba" target="_blank" rel="noreferrer">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-black font-semibold py-2 px-6 rounded-full transition duration-300 hover:brightness-[0.8] text-sm sm:text-base lg:text-lg">
                  View Resume
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
