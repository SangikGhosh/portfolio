import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPython,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJava,
} from "react-icons/fa";
import { SiNumpy, SiTailwindcss } from "react-icons/si";
import { BsCCircleFill } from "react-icons/bs";

const skillsData = [
  { name: "Java", level: 100, color: "#f44e0d", icon: FaJava },
  { name: "Python", level: 50, color: "#f7cd43", icon: FaPython },
  { name: "C", level: 80, color: "#a8b9cb", icon: BsCCircleFill },
  { name: "JavaScript", level: 80, color: "#f5d33c", icon: FaJs },
  { name: "SQL", level: 60, color: "#0876c8", icon: FaDatabase },
  { name: "React", level: 50, color: "#5ed3f3", icon: FaReact },
  { name: "Node.js", level: 70, color: "#68A063", icon: FaNodeJs },
  { name: "JDBC", level: 60, color: "#0d9b8e", icon: FaJava },
  { name: "JavaFX", level: 50, color: "#f88e0d", icon: FaJava },
  { name: "Numpy", level: 20, color: "#556bd5", icon: SiNumpy },
  { name: "Tailwind CSS", level: 80, color: "#1ebbbd", icon: SiTailwindcss },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div 
      ref={sectionRef}
      id="skills"
      className="skills relative py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background Gradient */}
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
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
            Expertise
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Technical </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Skills
            </span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#a1a1aa' }}>
            A comprehensive overview of my technical proficiencies and the tools I use to build exceptional software.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill} 
              variants={itemVariants}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: "Languages", value: "5+" },
            { label: "Frameworks", value: "4+" },
            { label: "Tools", value: "10+" },
            { label: "Projects", value: "12+" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm mt-2" style={{ color: '#71717a' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, variants, isInView }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const Icon = skill.icon;

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      let startTime;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCurrentLevel(Math.floor(progress * skill.level));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, skill.level]);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-5 rounded-2xl transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.boxShadow = `0 20px 40px -15px ${skill.color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="p-3 rounded-xl"
          style={{ 
            background: `${skill.color}20`,
            color: skill.color,
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">{skill.name}</h3>
          <p className="text-sm" style={{ color: '#71717a' }}>{currentLevel}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)`,
            boxShadow: `0 0 20px ${skill.color}50`,
          }}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillsSection;
