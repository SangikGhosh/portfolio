import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import img from "../assets/removebg2.png";
import FollowerPointerCard from "../components/custompointer/curser";

const Homepage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);

    return () => {
      lenis.destroy();
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
            staggerChildren: 0.03,
          },
        },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
    visible: prefersReducedMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } }
      : { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  const fadeUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } 
    },
  };

  const animatedParagraph = (text) =>
    text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        className="inline-block"
        variants={wordVariants}
      >
        {word}&nbsp;
      </motion.span>
    ));

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div id="home" className="home"></div>
      
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-6 md:px-12 lg:px-20 xl:px-32 pt-24 lg:pt-0">
        {/* Text Content */}
        <div className="flex flex-col items-start w-full lg:w-1/2 z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="mb-6"
          >
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#22d3ee',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
              Available for work
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="text-white block" variants={wordVariants}>
              {"I'm"}
            </motion.span>
            <motion.span
              className="block mt-2"
              variants={wordVariants}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #22d3ee 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sangik Ghosh
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: '#a1a1aa' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {animatedParagraph(
              "A dedicated software developer crafting efficient solutions across backend systems, Android apps, and modern web technologies."
            )}
          </motion.p>

          <motion.p
            className="mt-4 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: '#71717a' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {animatedParagraph(
              "Passionate about building seamless digital experiences with a drive for excellence and innovation."
            )}
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <motion.a
              href="#contact"
              onClick={scrollToContact}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 rounded-full font-semibold text-bg-primary overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5)',
              }}
            >
              <span className="relative z-10">Say Hello</span>
            </motion.a>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 text-center"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#a1a1aa',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.color = '#ffffff';
                e.target.style.boxShadow = '0 0 20px -5px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = '#a1a1aa';
                e.target.style.boxShadow = 'none';
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 flex gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">12+</p>
              <p className="text-sm text-text-muted mt-1">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">2+</p>
              <p className="text-sm text-text-muted mt-1">Years Experience</p>
            </div>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-12 lg:mb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <div className="relative">
            {/* Glow Ring */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)',
                filter: 'blur(40px)',
                transform: 'scale(1.1)',
              }}
            />
            
            {/* Glass Container */}
            <div 
              className="relative p-2 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <FollowerPointerCard className="rounded-full">
                <motion.img
                  src={img}
                  alt="Sangik Ghosh"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] object-cover rounded-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
              </FollowerPointerCard>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-accent-cyan font-semibold">Java Developer</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-accent-blue font-semibold">Full Stack</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs uppercase tracking-widest">Scroll</span>
          <div 
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full bg-accent-cyan"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Homepage;
