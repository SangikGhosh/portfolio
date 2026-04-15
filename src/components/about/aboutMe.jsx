import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import img from "../../assets/removebg.png";

const AboutMe = () => {
  const [projectCount, setProjectCount] = useState(0);
  const targetProjectCount = 12;
  const animationDuration = 1500;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
    if (isInView) {
      setProjectCount(0);
      animateCount();
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const infoItems = [
    { label: 'Name', value: 'Sangik Ghosh' },
    { label: 'Date of Birth', value: 'December 31, 2004' },
    { label: 'Address', value: 'Kolkata, West Bengal, India' },
    { label: 'Email', value: 'sangik.ghosh1@gmail.com' },
    { label: 'Phone', value: '+91 6295894643' },
  ];

  return (
    <div
      ref={sectionRef}
      id="aboutMe"
      className="aboutMe relative min-h-screen flex items-center justify-center py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      {/* Background Gradient Orb */}
      <div 
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image Section */}
          <motion.div 
            className="hidden lg:block lg:w-2/5"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)',
                  filter: 'blur(60px)',
                  transform: 'scale(0.9)',
                }}
              />
              
              {/* Glass Frame */}
              <div 
                className="relative p-3 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <img
                  src={img}
                  alt="Sangik Ghosh"
                  className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-4xl font-bold text-white">{projectCount}+</p>
                <p className="text-sm text-text-muted">Projects</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Section Label */}
            <motion.div variants={itemVariants}>
              <span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#22d3ee',
                }}
              >
                About Me
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              variants={itemVariants}
            >
              <span className="text-white">Crafting Digital </span>
              <span 
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Experiences
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-lg leading-relaxed"
              style={{ color: '#a1a1aa' }}
              variants={itemVariants}
            >
              I am a dedicated software developer with expertise in Java, Android app development, 
              and modern web technologies. My passion lies in creating efficient, scalable solutions 
              that make a real impact.
            </motion.p>

            {/* Info Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
              variants={itemVariants}
            >
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                  whileHover={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    y: -4,
                  }}
                >
                  <p className="text-xs uppercase tracking-wider text-text-muted mb-1">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Project Count */}
            <motion.div 
              className="lg:hidden pt-4"
              variants={itemVariants}
            >
              <div 
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p className="text-5xl font-bold text-white">{projectCount}+</p>
                <p className="text-text-muted mt-2">Projects Completed</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div className="pt-6" variants={itemVariants}>
              <motion.a 
                href="https://www.canva.com/design/DAGb6Dz0bSE/qcV2wlUYbogTpQSqTI0aQg/view?utm_content=DAGb6Dz0bSE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1a00f338ba" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                  color: '#0a0a0f',
                  boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5)',
                }}
              >
                <span>View Resume</span>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
