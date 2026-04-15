import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/SangikGhosh", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/sangikghosh/", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com/SangikGhosh", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative pt-20 pb-8 px-6 md:px-12 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.a 
              href="#home"
              className="inline-block text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sangik
              </span>
              <span className="text-white">.dev</span>
            </motion.a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#a1a1aa' }}>
              A passionate software developer crafting beautiful and functional digital experiences. Let&apos;s build something amazing together.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: '#a1a1aa' }}
                    whileHover={{ x: 4, color: '#22d3ee' }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-3">
              <p className="text-sm" style={{ color: '#a1a1aa' }}>
                <span className="text-white">Email:</span> sangikghosh45@gmail.com
              </p>
              <p className="text-sm" style={{ color: '#a1a1aa' }}>
                <span className="text-white">Location:</span> Kolkata, India
              </p>
            </div>
            
            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#22d3ee',
              }}
            >
              <FaArrowUp />
              Back to Top
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)' }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm flex items-center gap-1" style={{ color: '#71717a' }}>
            &copy; {currentYear} Sangik Ghosh. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-red-500 mx-1" />
            </motion.span>
            in India
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-xs transition-colors"
              style={{ color: '#71717a' }}
              onMouseEnter={(e) => e.target.style.color = '#22d3ee'}
              onMouseLeave={(e) => e.target.style.color = '#71717a'}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs transition-colors"
              style={{ color: '#71717a' }}
              onMouseEnter={(e) => e.target.style.color = '#22d3ee'}
              onMouseLeave={(e) => e.target.style.color = '#71717a'}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
