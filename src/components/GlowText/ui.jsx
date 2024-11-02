import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  size,
  duration = 2, // Default duration for animation
  glowColors = {
    stop1: "var(--yellow-500)",
    stop2: "var(--red-500)",
    stop3: "var(--blue-500)",
    stop4: "var(--cyan-500)",
    stop5: "var(--violet-500)",
  },
  id // Unique ID for gradient
}) => {
  const svgRef = useRef(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() =>
          setMaskPosition({
            cx: `${cxPercentage}%`,
            cy: `${cyPercentage}%`,
          })
        );
      }
    };

    svgRef.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      svgRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        {/* Continuous Animated Linear Gradient */}
        <motion.linearGradient
          id={`textGradient-${id}`}
          gradientUnits="userSpaceOnUse"
          x1="0%" x2="100%"
          y1="0%" y2="0%"
          animate={{
            x1: ["0%", "100%", "0%"],
            x2: ["100%", "0%", "100%"],
          }}
          transition={{
            duration: 3, // Duration for each glow pulse cycle
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <stop offset="0%" stopColor={glowColors.stop1} />
          <stop offset="25%" stopColor={glowColors.stop2} />
          <stop offset="50%" stopColor={glowColors.stop3} />
          <stop offset="75%" stopColor={glowColors.stop4} />
          <stop offset="100%" stopColor={glowColors.stop5} />
        </motion.linearGradient>

        {/* Radial Mask with Animated Position */}
        <motion.radialGradient
          id={`revealMask-${id}`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        
        <mask id={`textMask-${id}`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#revealMask-${id})`} />
        </mask>
      </defs>
      
      {/* Static Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={`font-[helvetica] font-bold stroke-neutral-500 tracking-tight hover:dark:stroke-neutral-900 fill-transparent text-3xl`}
      >
        {text}
      </text>

      {/* Continuous Glowing Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#textGradient-${id})`} // Animated gradient
        strokeWidth="0.3"
        mask={`url(#textMask-${id})`} // Mask applied
        className={`font-[helvetica] font-bold tracking-tight text-3xl`}
      >
        {text}
      </text>
    </svg>
  );
};
