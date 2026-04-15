import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import img from "../../assets/filehider.png";
import Card from "./Card";
import { BsArrowUpRight } from "react-icons/bs";

export function BentoGridDemo() {
  const [showMessage, setShowMessage] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={sectionRef}
      className="projects relative py-24 lg:py-32 px-6 md:px-12 lg:px-20" 
      id="projects"
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#22d3ee',
            }}
          >
            Portfolio
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Featured </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Projects
            </span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in full-stack development, 
            from web applications to backend systems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <BentoGrid className="gap-6">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              index={i}
              title={item.title}
              description={
                <div className="flex flex-col h-full">
                  <p className="flex-1 mb-4">{item.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      color: '#22d3ee',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)';
                      e.currentTarget.style.color = '#0a0a0f';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.currentTarget.style.color = '#22d3ee';
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    }}
                    onClick={() => {
                      if (item.link) {
                        window.open(item.link, "_blank");
                      } else {
                        setShowMessage(true);
                      }
                    }}
                  >
                    <span>View Project</span>
                    <BsArrowUpRight className="text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </div>
              }
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>

        {showMessage && (
          <Card
            message="This project link is currently unavailable."
            onClose={() => setShowMessage(false)}
          />
        )}
      </div>
    </div>
  );
}

const Skeleton = ({ image }) => (
  <div className="relative flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
    <img 
      src={image} 
      alt="project" 
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
    />
    {/* Overlay */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.8) 100%)',
      }}
    />
  </div>
);

const items = [
  {
    title: "ChatBuzz - Real time web chat application",
    description: "ChatBuzz is a real-time chat app built with React, Express, Node.js, and MongoDB, featuring secure authentication and seamless user communication.",
    header: <Skeleton image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6TOU4rBTi8ucigEZ5_RdB7auzNKzGYncvIA&s" />,
    icon: <IconClipboardCopy className="h-5 w-5 text-accent-cyan" />,
    link: "https://github.com/SangikGhosh/realtime-chat-app",
  },
  {
    title: "TECHHUB",
    description: "TechHub Club: Interactive platform for tech enthusiasts, built with React.",
    header: <Skeleton image="https://mir-s3-cdn-cf.behance.net/projects/404/6d44db180048409.Y3JvcCw2MzkyLDQ5OTksMTQyLDA.jpg" />,
    icon: <IconFileBroken className="h-5 w-5 text-accent-cyan" />,
  },
  {
    title: "Render.com website",
    description: "Deploy full-stack web applications effortlessly with Render, featuring automatic scaling, continuous deployment, and easy management of services.",
    header: <Skeleton image="https://docs.render.com/og/free-32f87dc.png" />,
    icon: <IconTableColumn className="h-5 w-5 text-accent-cyan" />,
  },
  {
    title: "Mobile Legend: Bang Bang Website",
    description: "MLBB (Mobile Legends: Bang Bang) is a fast-paced 5v5 MOBA game featuring strategic team battles, heroes with unique abilities, and real-time multiplayer action.",
    header: <Skeleton image="https://i.ytimg.com/vi/QJTEBywtU-I/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWShLMA8=&rs=AOn4CLDzqMy8hvNoGiJt9VTQof7GEFRZVw" />,
    icon: <IconArrowWaveRightUp className="h-5 w-5 text-accent-cyan" />,
    link: "https://github.com/SangikGhosh/MLBB",
  },
  {
    title: "Social Media Using MERN Stack",
    description: "Social media platform using MERN stack with authentication, posts, comments, and file uploads.",
    header: <Skeleton image="https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej-1280x720.png" />,
    icon: <IconSignature className="h-5 w-5 text-accent-cyan" />,
  },
  {
    title: "FLUX.1 Website",
    description: "Flux.1 is an AI tool that generates detailed images from text prompts, offering fast and diverse outputs.",
    header: <Skeleton image="https://www.trickyenough.com/wp-content/uploads/2024/08/Made-by-1.png" />,
    icon: <IconBoxAlignTopLeft className="h-5 w-5 text-accent-cyan" />,
    link: "https://github.com/sandipsaha2005/final-round-project",
  },
  {
    title: "File Hiding System (from local storage)",
    description: "A secure service that allows users to hide files by encrypting them, making them inaccessible to unauthorized users. This service sends OTPs for verification and ensures data integrity.",
    header: <Skeleton image={img} />,
    icon: <IconBoxAlignRightFilled className="h-5 w-5 text-accent-cyan" />,
    link: "https://github.com/SangikGhosh/FileHiderService",
  },
];

export default BentoGridDemo;
