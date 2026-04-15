import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMedal,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaListAlt,
} from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import PropTypes from "prop-types";

const LeetCodeProgress = () => {
  const [progress, setProgress] = useState(null);
  const [badgesData, setBadgesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("https://leetcode-api-faisalshohag.vercel.app/Sangik_Ghosh")
      .then((response) => response.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data", error);
        setLoading(false);
      });

    fetch("https://alfa-leetcode-api.onrender.com/Sangik_Ghosh/badges")
      .then((response) => response.json())
      .then((data) => {
        setBadgesData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch badges:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: '#3b82f6', borderTopColor: 'transparent' }}
          />
          <p style={{ color: '#a1a1aa' }}>Loading achievements...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }
  
  if (!progress) return <div>No data available.</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  return (
    <div 
      ref={sectionRef}
      id="achievements" 
      className="achievements relative min-h-screen py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-1/3 left-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
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
            Achievements
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">LeetCode </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Progress
            </span>
          </h2>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          className="mb-12 p-6 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                  filter: 'blur(20px)',
                  opacity: 0.5,
                }}
              />
              <img
                src="https://avatars.githubusercontent.com/u/136787875?s=400&u=0c804c413ccf10b164faed21260d9771f2aa30df&v=4"
                alt="Profile"
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                style={{ border: '3px solid #22d3ee' }}
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Sangik Ghosh</h3>
              <p style={{ color: '#a1a1aa' }} className="mt-1">Tech Enthusiast | Problem Solver</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ProgressCard
            title="Total Solved"
            value={progress.totalSolved}
            gradient="from-blue-500 to-cyan-500"
            icon={<FaCheckCircle className="w-6 h-6" />}
            variants={itemVariants}
          />
          <ProgressCard
            title="Easy Solved"
            value={progress.easySolved}
            gradient="from-emerald-500 to-green-500"
            icon={<FaListAlt className="w-6 h-6" />}
            variants={itemVariants}
          />
          <ProgressCard
            title="Medium Solved"
            value={progress.mediumSolved}
            gradient="from-amber-500 to-yellow-500"
            icon={<FaChartLine className="w-6 h-6" />}
            variants={itemVariants}
          />
          <ProgressCard
            title="Hard Solved"
            value={progress.hardSolved}
            gradient="from-red-500 to-rose-500"
            icon={<FaTrophy className="w-6 h-6" />}
            variants={itemVariants}
          />
          <ProgressCard
            title="Contribution"
            value={progress.contributionPoint}
            gradient="from-indigo-500 to-violet-500"
            icon={<RiCopperCoinFill className="w-6 h-6" />}
            variants={itemVariants}
          />
          <ProgressCard
            title="Global Rank"
            value={progress.ranking}
            gradient="from-purple-500 to-pink-500"
            icon={<FaMedal className="w-6 h-6" />}
            variants={itemVariants}
          />
        </motion.div>

        {/* Badges Section */}
        {badgesData?.badges?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Earned Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {badgesData.badges.map((badge, index) => (
                <BadgeCard key={index} badge={badge} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ProgressCard = ({ title, value, gradient, icon, variants }) => {
  const [displayedValue, setDisplayedValue] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const targetValue = parseInt(value, 10);
      const duration = 2000;
      let startTime;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setDisplayedValue(Math.floor(progress * targetValue));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative p-6 rounded-3xl overflow-hidden transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px -15px rgba(59, 130, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gradient Accent */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      
      <div className="flex items-center gap-4 mb-4">
        <div 
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}
          style={{ color: 'white' }}
        >
          {icon}
        </div>
        <p className="text-sm font-medium" style={{ color: '#a1a1aa' }}>{title}</p>
      </div>
      
      <p className="text-4xl font-bold text-white">{displayedValue.toLocaleString()}</p>
    </motion.div>
  );
};

const BadgeCard = ({ badge, index }) => (
  <motion.div 
    className="p-6 rounded-2xl text-center transition-all duration-300"
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ 
      y: -4, 
      background: 'rgba(255, 255, 255, 0.06)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
    }}
  >
    <img
      src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
      alt={badge.displayName || badge.name}
      className="w-20 h-20 mx-auto mb-4"
    />
    <h4 className="text-sm font-semibold text-white">{badge.displayName || badge.name}</h4>
    {badge.creationDate && (
      <p className="text-xs mt-2" style={{ color: '#71717a' }}>
        {new Date(badge.creationDate).toLocaleDateString()}
      </p>
    )}
  </motion.div>
);

ProgressCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gradient: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  variants: PropTypes.object,
};

BadgeCard.propTypes = {
  badge: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    name: PropTypes.string,
    creationDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default LeetCodeProgress;
