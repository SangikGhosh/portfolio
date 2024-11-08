// import img from "next/img";
import React from "react";
import { Timeline } from "./timeline";
import { TextHoverEffect } from "../GlowText/ui";
import image from "../../assets/earlylife1.jpg";
import image1 from "../../assets/earlylife1.jpg";
import image2 from "../../assets/earlylife1.jpg";
import image3 from "../../assets/earlylife1.jpg";
import image4 from "../../assets/earlylife1.jpg";
import image5 from "../../assets/earlylife1.jpg";
import image6 from "../../assets/earlylife1.jpg";
import image7 from "../../assets/earlylife1.jpg";
import image8 from "../../assets/earlylife1.jpg";
import image9 from "../../assets/earlylife1.jpg";
import image10 from "../../assets/earlylife1.jpg";
import image11 from "../../assets/earlylife1.jpg";

export function TimelineDemo() {
  const data = [
    {
        title: "Early Life",
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              In 2022, I completed my high school education, where I developed a keen interest in computers and programming,Tranfered to Kolkata from Delhi in 2016 .Born in 2007.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <img
                  src={image10}
                  alt="Python Certificate"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                
                 <img
                  src={image11}
                  alt="Leet code 50 days certificate"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              </div>
          </div>
        ),
      },
      {
        title: "Started College",
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              In  Fall 2022, I began my academic journey at Behal Government Polytechnic in Computer Science and Technology. This marked a significant milestone in my pursuit of knowledge and skills in the tech industry.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              As I navigate through my studies, I'm excited to explore various domains, engage with innovative projects, and collaborate with fellow students.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={image8}
                alt="College Campus"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <img
                src={image9}
                alt="College Event"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            </div>
          </div>
        ),
      },  
      {
        title: "Mid 2023",
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              In 2023, I completed an internship at Surtle Security, where I focused on backend development using Java. This experience allowed me to deepen my understanding of server-side programming and strengthen my coding skills.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
              During my internship, I worked on various projects that enhanced my knowledge of security protocols and backend architecture.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={image7}
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
             
             
            </div>
          </div>
        ),
      },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            In September 2024, I participated in the Sheriyans Coding School Hackathon as a finalist with my team , successfully passing rounds 1, 2, and 3 against fierce competition from all over India.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={image3} // Replace with actual image URL
              alt="Hackathon Event"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={image4} // Replace with actual image URL
              alt="Hackathon Team"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={image5} // Replace with actual image URL
              alt="Hackathon Presentation"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={image6} // Replace with actual image URL
              alt="Hackathon Experience"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },

  {
    title: "Current",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
          Currently, I am working on various skills and projects, focusing on Data Structures and Algorithms (DSA), backend development, Spring Boot, Android development, and solving problems on LeetCode. I am also pursuing certifications to enhance my knowledge and credibility in the tech field.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={image2}
            alt="Python Certificate"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src={image}
            alt="Java certificate"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
           <img
            src={image1}
            alt="Leet code 50 days certificate"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },  
    
  ];
  return (
    (<div className="journey w-full bg-[#000000]">
      <TextHoverEffect text="JOURNEY" id="journey"/>
      <Timeline data={data} />
    </div>)
  );
}