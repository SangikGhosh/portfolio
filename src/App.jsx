import { useState } from 'react'
import Homepage from './components/home'
import { NavbarDemo } from './components/navbar/navbar'
import { BentoGridDemo } from './components/projects/app'
import Team from './components/ourTeam/team'
import AboutMe from './components/about/aboutMe'

function App() {

  return (
    <>
    <NavbarDemo/>
    <Homepage/>
    <AboutMe/>
    <BentoGridDemo/>
    <Team/>
    </>
  )
}

export default App
