import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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
import { TextHoverEffect } from "../GlowText/ui";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const skillsData = [
  { name: "Java", level: 100, color: "#f44e0d", icon: <FaJava className="w-5 h-5 inline-block" /> },
  { name: "Python", level: 50, color: "#f7cd43", icon: <FaPython className="w-5 h-5 inline-block" /> },
  { name: "C", level: 80, color: "#a8b9cb", icon: <BsCCircleFill className="w-5 h-5 inline-block" /> },
  { name: "JavaScript", level: 80, color: "#f5d33c", icon: <FaJs className="w-5 h-5 inline-block" /> },
  { name: "SQL", level: 60, color: "#0876c8", icon: <FaDatabase className="w-5 h-5 inline-block" /> },
  { name: "React", level: 50, color: "#5ed3f3", icon: <FaReact className="w-5 h-5 inline-block" /> },
  { name: "Node.js", level: 70, color: "#68A063", icon: <FaNodeJs className="w-5 h-5 inline-block" /> },
  { name: "JDBC", level: 60, color: "#0d9b8e", icon: <FaJava className="w-5 h-5 inline-block" /> },
  { name: "JavaFX", level: 50, color: "#f88e0d", icon: <FaJava className="w-5 h-5 inline-block" /> },
  { name: "Numpy", level: 20, color: "#556bd5", icon: <SiNumpy className="w-5 h-5 inline-block" /> },
  { name: "Tailwind CSS", level: 80, color: "#1ebbbd", icon: <SiTailwindcss className="w-5 h-5 inline-block" /> },
];

const pieChartData = {
  labels: skillsData.map((skill) => skill.name),
  datasets: [
    {
      data: skillsData.map((skill) => skill.level),
      backgroundColor: skillsData.map((skill) => skill.color),
      hoverBackgroundColor: skillsData.map((skill) => skill.color),
    },
  ],
};

const SkillsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
    };
  }, []);

  return (
    <>
      
      <div ref={skillsRef} className="skills text-zinc-400 p-4 lg:p-[5rem] shadow-lg md:p-6">
      <TextHoverEffect text="SKILLS" id="skills" />
        <div className="flex flex-col gap-5 md:flex-row md:gap-7">
          {/* First Column for Progress Bars */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-xl md:text-2xl tracking-wide font-semibold mb-4 text-center md:text-left">
              Progress Bars
            </h3>
            {skillsData.slice(0, 6).map((skill, index) => (
              <div key={index} className="mb-4 md:mb-6">
                <span className="block mb-1 font-medium text-sm md:text-base">
                  {skill.name} {skill.level}%{" "}
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                </span>
                <div className="bg-gray-700 rounded-full h-3 md:h-4">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isInView ? "animate-progress" : ""
                    }`}
                    style={{
                      width: isInView ? `${skill.level}%` : "0%",
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Column for Progress Bars */}
          <div className="w-full md:w-1/4 md:mt-11">
            {skillsData.slice(6).map((skill, index) => (
              <div key={index} className="mb-4 md:mb-6">
                <span className="block mb-1 font-medium text-sm md:text-base">
                  {skill.name} {skill.level}%{" "}
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                </span>
                <div className="bg-gray-700 rounded-full h-3 md:h-4">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isInView ? "animate-progress" : ""
                    }`}
                    style={{
                      width: isInView ? `${skill.level}%` : "0%",
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pie Chart - Responsive Width */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96">
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsSection;
