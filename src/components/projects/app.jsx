import React from "react";
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
import { div } from "framer-motion/client";
import { TextHoverEffect } from "../GlowText/ui";
import img from "../../assets/filehider.png";
import AnimatedModalDemo from "../viewProject/App";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { BsArrowUpRight } from "react-icons/bs";
import Swal from "sweetalert2";

export function BentoGridDemo() {
  return (
    <>
      <div className="projects lg:pt-0 pt-20" id="projects">
        <TextHoverEffect text="PROJECTS" id="projects" />
        <BentoGrid className="max-w-7xl p-10">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={
                <div>
                  <div className="relative flex flex-col h-full">
                    <p>{item.description}</p>
                  </div>
                  <div className="flex justify-center">
                    <ModalTri
                      className="mt-3 bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn"
                      onClick={() => {
                        if (item.link) {
                          window.open(item.link, "_blank");
                        } else {
                          Swal.fire({
                            title: "Oops!",
                            text: "Link not available at this moment.",
                            showConfirmButton: true,
                            confirmButtonText: "Exit",
                            confirmButtonColor: "#000000",
                            confirmButtonTextColor: "#000000",
                            background: "#000000",
                            width: "500px",
                            heightAuto: false,
                            timer: 3000,
                            customClass: {
                              popup: "custom-alert",
                              confirmButton: "custom-button",
                            },
                          });
                        }
                      }}
                      
                      
                    >
                      <span className="group-hover/modal-btn:translate-x-40 text-center text-black bg-white transition duration-500">
                        Check Out
                      </span>
                      <div className="-translate-x-40 bg-white group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
                        <BsArrowUpRight className="bg-white h-4 w-4" />
                      </div>
                    </ModalTri>
                  </div>
                </div>
              }
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </>
  );
}



const Skeleton = ({ image }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img src={image} alt="project" className="object-cover w-full h-full rounded-xl" />
  </div>
);

const items = [
  {
    title: "ChatBuzz - Real time web chat application",
    description: "ChatBuzz is a real-time chat app built with React, Express, Node.js, and MongoDB, featuring secure authentication and seamless user communication.",
    header: <Skeleton image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6TOU4rBTi8ucigEZ5_RdB7auzNKzGYncvIA&s" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SangikGhosh/realtime-chat-app",
  },
  {
    title: "TECHHUB",
    description: "TechHub Club: Interactive platform for tech enthusiasts, built with React.",
    header: <Skeleton image="https://mir-s3-cdn-cf.behance.net/projects/404/6d44db180048409.Y3JvcCw2MzkyLDQ5OTksMTQyLDA.jpg" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Render.com website",
    description:
      "Deploy full-stack web applications effortlessly with Render, featuring automatic scaling, continuous deployment, and easy management of services.",
    header: <Skeleton image="https://docs.render.com/og/free-32f87dc.png" />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Mobile Legend: Bang Bang Website",
    description: "MLBB (Mobile Legends: Bang Bang) is a fast-paced 5v5 MOBA game featuring strategic team battles, heroes with unique abilities, and real-time multiplayer action.",
    header: <Skeleton image="https://i.ytimg.com/vi/QJTEBywtU-I/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWShLMA8=&rs=AOn4CLDzqMy8hvNoGiJt9VTQof7GEFRZVw" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SangikGhosh/MLBB",
  },
  {
    title: "Social Media Using MERN Stack",
    description: "Social media platform using MERN stack with authentication, posts, comments, and file uploads.",
    header: <Skeleton image="https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej-1280x720.png" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "FLUX.1 Website",
    description: "Flux.1 is an AI tool that generates detailed images from text prompts, offering fast and diverse outputs.",
    header: <Skeleton image="https://www.trickyenough.com/wp-content/uploads/2024/08/Made-by-1.png" />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/sandipsaha2005/final-round-project",
  },
  {
    title: "Flie Hideing System(from local storage)",
    description: "A secure service that allows users to hide files by encrypting them, making them inaccessible to unauthorized users. This service sends OTPs for verification and ensures data integrity with a clean and user-friendly interface.",
    header: <Skeleton image={img} />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    link: "https://github.com/SangikGhosh/FileHiderService",
  },
];


export const ModalTri = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md dark:text-white text-center relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ModalTri.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func, // Add this
};

ModalTri.defaultProps = {
  className: "",
  onClick: null, // Add this
};