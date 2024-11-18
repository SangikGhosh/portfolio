import { TextHoverEffect } from "../GlowText/ui";
import { AnimatedTestimonials } from "./ui";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Join us as a Java Software Engineer to develop robust applications. Strong Java and web technology skills required. Familiarity with Agile and version control is a plus.",
      name: "Sangik Ghosh",
      designation: "Java Devoloper",
      src: "https://avatars.githubusercontent.com/u/136787875?v=4",
    },
    {
      quote:
        "Seeking a skilled Python Developer to create scalable web applications. Proficient in Django or Flask and API development. Familiarity with SQL/NoSQL databases and cloud services is desirable.",
      name: "Shubhendu Halder",
      designation: "Python Developer",
      src: "https://avatars.githubusercontent.com/u/141364632?v=4",
    },
    {
      quote:
        "Seeking an experienced Senior Java Developer to design and maintain scalable applications. Must have expertise in Java, Spring, and RESTful APIs. Leadership and mentorship skills are essential.",
      name: "Sandip Saha",
      designation: "Operations Director at CloudScale",
      src: "https://avatars.githubusercontent.com/u/110690069?v=4",
    },
    {
      quote:
        "Looking for a Junior Java Developer eager to learn and grow. Basic Java knowledge required. Work under senior developers and assist in application development.",
      name: "Aman Jha",
      designation: "Java Developer",
      src: "https://avatars.githubusercontent.com/u/80311301?v=4",
    }
  ];
  return (
    <>
    
  <AnimatedTestimonials testimonials={testimonials} />
</>
  );
}
