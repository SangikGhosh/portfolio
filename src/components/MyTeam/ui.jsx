import PropTypes from "prop-types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export const AnimatedTestimonials = ({ testimonials, autoplay = true }) => {
  const [active, setActive] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  const handleSwipe = () => {
    if (!startPosition || !endPosition) return;
    const swipeDistance = startPosition - endPosition;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) handleNext();
    else if (swipeDistance < -swipeThreshold) handlePrev();

    setStartPosition(null);
    setEndPosition(null);
  };

  const handleMouseDown = (e) => {
    setStartPosition(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setEndPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleSwipe();
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 11) - 5;

  return (
    <div
      ref={sectionRef}
      id="ourTeam"
      className="ourTeam relative py-24 lg:py-32 px-6 md:px-12 lg:px-20"
      onTouchStart={(e) => setStartPosition(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setEndPosition(e.targetTouches[0].clientX)}
      onTouchEnd={handleSwipe}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#22d3ee',
            }}
          >
            Collaborators
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Team
            </span>
          </h2>
        </motion.div>

        {/* Team Content */}
        <motion.div 
          className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Image Section */}
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.95,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 10 : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-0 flex justify-center md:justify-start"
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)',
                        filter: 'blur(40px)',
                        transform: 'scale(0.9)',
                      }}
                    />
                    
                    {/* Glass Frame */}
                    <div 
                      className="relative p-2 rounded-3xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        draggable={false}
                        className="h-[350px] md:h-[450px] w-[280px] md:w-[350px] rounded-2xl object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {testimonials[active].name}
              </h3>
              <p 
                className="text-lg mb-8"
                style={{ color: '#22d3ee' }}
              >
                {testimonials[active].designation}
              </p>
              <motion.p 
                className="text-lg leading-relaxed"
                style={{ color: '#a1a1aa' }}
              >
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(6px)",
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.06,
                      ease: "easeOut",
                      delay: 0.012 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <IconArrowLeft className="h-5 w-5 text-white" />
              </motion.button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: isActive(index) ? '24px' : '8px',
                      background: isActive(index) 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)' 
                        : 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <IconArrowRight className="h-5 w-5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

AnimatedTestimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
    })
  ).isRequired,
  autoplay: PropTypes.bool,
};
