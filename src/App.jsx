import { useState } from 'react'
import Homepage from './components/home'
import { NavbarDemo } from './components/navbar/navbar'
import { BentoGridDemo } from './components/projects/app'
import Team from './components/ourTeam/team'
import AboutMe from './components/about/aboutMe'
import LeetCodeProgress from "./components/Leetcode/leetcode"
import LeetcodeCal from './components/Leetcode/calender'
import Mygithub from './components/GithubRepo/github'
import SkillsSection from './components/Skills/skills'
import GithubCal from './components/GithubRepo/GitCalender'
import Landing from "./components/contact/contact"

function App() {

  return (
    <>
    <NavbarDemo/>
    <Homepage/>
    <AboutMe/>
    <BentoGridDemo/>
    <Team/>
    <LeetCodeProgress/>
    <LeetcodeCal/>
    <Mygithub/>
    <GithubCal/>
    <SkillsSection/>
    <Landing/>
    </>
  )
}

export default App
