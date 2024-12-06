import { useState, useEffect } from 'react'
import Homepage from './components/home'
import { NavbarDemo } from './components/navbar/navbar'
import { BentoGridDemo } from './components/projects/app'
import AboutMe from './components/about/aboutMe'
import LeetCodeProgress from "./components/Leetcode/leetcode"
import LeetcodeCal from './components/Leetcode/calender'
import Mygithub from './components/GithubRepo/github'
import SkillsSection from './components/Skills/skills'
import GithubCal from './components/GithubRepo/GitCalender'
import Landing from "./components/contact/contact"
import { TimelineDemo } from './components/Timeline/app'
import Footer from './components/Footer/footer'
import { AnimatedTestimonialsDemo } from './components/MyTeam/app'
import Preloader from "./components/preloader/App"
import AnimatedModalDemo from "./components/viewProject/App"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {isLoading ? <Preloader /> : 
    <div>
      <NavbarDemo/>
      <Homepage/>
      <AboutMe/>
      <BentoGridDemo/>
      <AnimatedTestimonialsDemo/>
      <LeetCodeProgress/>
      <LeetcodeCal/>
      <Mygithub/>
      <GithubCal/>
      <SkillsSection/>
      <Landing/>
      <TimelineDemo/>
      <Footer/>
    </div>}
    </>
  )
}

export default App
