import PropTypes from "prop-types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TextHoverEffect } from "../GlowText/ui";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
      className="relative pt-[80px]"
      onTouchStart={(e) => setStartPosition(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setEndPosition(e.targetTouches[0].clientX)}
      onTouchEnd={handleSwipe}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div className="ourTeam">2
        <TextHoverEffect text="OUR TEAM" id="team" />
      </div>

      <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-0">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative h-80 w-full">
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
                      opacity: isActive(index) ? 1 : 0.8,
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
                      duration: 0.3, // Shortened duration for faster transitions
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom bg-transparent will-change-transform"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                      loading="lazy" // Lazy-load images
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.25, // Slightly faster transition
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold dark:text-white text-black">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[active].designation}
              </p>
              <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(8px)", // Reduced blur intensity
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.08, // Faster word transitions
                      ease: "easeInOut",
                      delay: 0.015 * index, // Reduced delay per word
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowLeft
                  className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300"
                />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowRight
                  className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for props validation
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
