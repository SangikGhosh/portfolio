import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  size,
  strokeWidth,
  fontSize = "3xl",
  duration = 2, // Default duration
  glowColors = {
    stop1: "var(--cyan-400)",   // Cool and refreshing
    stop2: "var(--blue-500)",   // Deep and vivid
    stop3: "var(--indigo-500)", // Transition to a rich tone
    stop4: "var(--violet-500)", // Mysterious and bold
    stop5: "var(--pink-500)",   // Bright and playful
    stop6: "var(--orange-400)", // Warm and energizing
    stop7: "var(--yellow-400)", // Vibrant and cheerful
    
  },  
  id // New prop for unique ID
}) => {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        if (svgRef.current) {
          const svgRect = svgRef.current.getBoundingClientRect();
          const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
          const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
          setMaskPosition({
            cx: `${cxPercentage}%`,
            cy: `${cyPercentage}%`,
          });
        }
      }}
      className="select-none"
    >
      <defs>
        <linearGradient
          id={`textGradient-${id}`} // Unique ID for gradient
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={glowColors.stop1} />
              <stop offset="15%" stopColor={glowColors.stop2} />
              <stop offset="30%" stopColor={glowColors.stop3} />
              <stop offset="45%" stopColor={glowColors.stop4} />
              <stop offset="50%" stopColor={glowColors.stop5} />
              <stop offset="65%" stopColor={glowColors.stop6} />
              <stop offset="70%" stopColor={glowColors.stop7} />
              
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={`revealMask-${id}`} // Unique ID for mask
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{
            type: "tween",
            duration: 0.1,
            ease: "linear",
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`textMask-${id}`}> {/* Unique ID for mask */}
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#revealMask-${id})`} />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth || 0.3}
        className={`font-[helvetica] font-bold stroke-neutral-100 dark:stroke-neutral-700 fill-transparent text-${fontSize} tracking-tight`}
        style={{ opacity: hovered ? 1 : 1 }} // Light stroke when not hovered
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={`font-[helvetica] font-bold fill-transparent text-${fontSize} brightness-200 stroke-neutral-100 tracking-tight dark:stroke-neutral-800`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#textGradient-${id})`} // Use unique ID for gradient
        strokeWidth="0.3"
        mask={`url(#textMask-${id})`} // Use unique ID for mask
        className={`font-[helvetica] font-bold tracking-tight fill-transparent text-${fontSize}`}
      >
        {text}
      </text>
    </svg>
  );
};
