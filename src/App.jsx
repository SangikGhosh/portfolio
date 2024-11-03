import { useState } from 'react'
import Homepage from './components/home'
import { NavbarDemo } from './components/navbar/navbar'
import { BentoGridDemo } from './components/projects/app'
import Team from './components/ourTeam/team'

function App() {

  return (
    <>
    <NavbarDemo/>
    <Homepage/>
    <BentoGridDemo/>
    <Team/>
    </>
  )
}

export default App
