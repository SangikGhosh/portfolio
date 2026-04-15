import Navbar from "./components/Navbar/navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import About from "./components/About/about";
import Projects from "./components/projects/projects";
import LeetCode from "./components/Leetcode/leetcode";
import Skills from "./components/Skills/skills";
import { AnimatedTestimonialsDemo } from "./components/MyTeam/app";
import Timeline from "./components/Timeline/timeline";
import Mygithub from "./components/GithubRepo/github";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import "./App.css";

function App() {
  return (
    <div 
      className="app-container"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <About />
        <Projects />
        <LeetCode />
        <Skills />
        <AnimatedTestimonialsDemo />
        <Timeline />
        <Mygithub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
