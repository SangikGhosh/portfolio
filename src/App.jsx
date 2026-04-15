import Navbar from "./components/navbar/navbar";
import HeroSection from "./components/home";
import About from "./components/about/aboutMe";
import Projects from "./components/projects/app";
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
