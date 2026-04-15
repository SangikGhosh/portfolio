import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

const Mygithub = () => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchReposAndProfile = async () => {
      try {
        const repoResponse = await axios.get('https://api.github.com/users/SangikGhosh/repos?visibility=all&sort=updated&per_page=6');
        const profileResponse = await axios.get('https://api.github.com/users/SangikGhosh');
        
        setRepos(repoResponse.data);
        setProfile(profileResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchReposAndProfile();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: '#3b82f6', borderTopColor: 'transparent' }}
          />
          <p style={{ color: '#a1a1aa' }}>Loading repositories...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-6 mb-12 p-6 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
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
              src={profile.avatar_url}
              alt="Profile"
              className="relative w-20 h-20 rounded-full object-cover"
              style={{ border: '3px solid #22d3ee' }}
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h2>
            <p style={{ color: '#a1a1aa' }} className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <FaGithub className="text-lg" />
              @{profile.login}
            </p>
          </div>
          <div className="sm:ml-auto flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.public_repos}</p>
              <p className="text-xs" style={{ color: '#71717a' }}>Repos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profile.followers}</p>
              <p className="text-xs" style={{ color: '#71717a' }}>Followers</p>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Recent Repositories
        </motion.h3>

        {/* Repos Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="block p-6 rounded-2xl transition-all duration-300"
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
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <FaGithub className="w-5 h-5" style={{ color: '#22d3ee' }} />
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: '#71717a' }}>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                {repo.name}
              </h4>
              <p className="text-sm line-clamp-2 mb-4" style={{ color: '#a1a1aa' }}>
                {repo.description || "No description available"}
              </p>
              
              {repo.language && (
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: repo.language === 'JavaScript' ? '#f7df1e' :
                                  repo.language === 'TypeScript' ? '#3178c6' :
                                  repo.language === 'Java' ? '#b07219' :
                                  repo.language === 'Python' ? '#3572A5' :
                                  repo.language === 'HTML' ? '#e34c26' :
                                  repo.language === 'CSS' ? '#563d7c' : '#22d3ee'
                    }}
                  />
                  <span className="text-xs" style={{ color: '#71717a' }}>{repo.language}</span>
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Mygithub;
