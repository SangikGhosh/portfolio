import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaGraduationCap, FaCode, FaBriefcase, FaCertificate } from "react-icons/fa";

const timelineData = [
  {
    year: "2025 - 2028",
    title: "B.Tech in CSE (AI & ML)",
    institution: "Heritage Institute of Technology, Kolkata",
    description: "Currently pursuing Bachelor of Technology in Computer Science and Engineering with specialization in Artificial Intelligence & Machine Learning.",
    icon: FaGraduationCap,
    status: "current",
  },
  {
    year: "2025",
    title: "Diploma in CST",
    institution: "Behala Govt. Polytechnic",
    description: "Completed Diploma in Computer Science & Technology with OGPA: 8.1 | Overall Percentage: 79.6%. This is where my coding journey began and where I built my foundational programming skills.",
    icon: FaCertificate,
    status: "completed",
  },
  {
    year: "2023",
    title: "Started Programming Journey",
    institution: "Self-Learning & Online Courses",
    description: "Began learning programming with Java, Python, and web technologies. Started solving problems on LeetCode and building personal projects.",
    icon: FaCode,
    status: "completed",
  },
  {
    year: "2020",
    title: "Secondary Education",
    institution: "West Bengal Board",
    description: "Successfully completed 10th standard. Started exploring basic programming concepts and developed interest in technology.",
    icon: FaBriefcase,
    status: "completed",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      ref={sectionRef}
      id="timeline"
      className="timeline relative py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
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
            Journey
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">My </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Timeline
            </span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#a1a1aa' }}>
            A journey of continuous learning and growth in the world of technology.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated Line */}
          <div 
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <motion.div 
              className="w-full"
              style={{ 
                height: lineHeight,
                background: 'linear-gradient(180deg, #3b82f6 0%, #22d3ee 100%)',
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, isInView }) => {
  const isEven = index % 2 === 0;
  const Icon = item.icon;
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Content */}
      <div className={`flex-1 ml-12 md:ml-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 rounded-2xl transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px -15px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: item.status === 'current' 
                ? 'rgba(34, 211, 238, 0.1)' 
                : 'rgba(59, 130, 246, 0.1)',
              border: item.status === 'current' 
                ? '1px solid rgba(34, 211, 238, 0.3)' 
                : '1px solid rgba(59, 130, 246, 0.3)',
              color: item.status === 'current' ? '#22d3ee' : '#3b82f6',
            }}
          >
            {item.year}
          </span>
          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-sm mb-3" style={{ color: '#22d3ee' }}>{item.institution}</p>
          <p className="text-sm" style={{ color: '#a1a1aa' }}>{item.description}</p>
        </motion.div>
      </div>

      {/* Center Icon */}
      <motion.div 
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={itemInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: item.status === 'current' 
              ? 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            border: item.status === 'current' 
              ? 'none' 
              : '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: item.status === 'current' 
              ? '0 0 20px rgba(34, 211, 238, 0.5)' 
              : 'none',
          }}
        >
          <Icon 
            className="w-4 h-4"
            style={{ 
              color: item.status === 'current' ? '#0a0a0f' : '#a1a1aa' 
            }}
          />
        </div>
      </motion.div>

      {/* Empty Spacer */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

export default Timeline;
