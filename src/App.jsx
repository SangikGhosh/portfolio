import { useState } from 'react'
import Homepage from './components/home'
import { NavbarDemo } from './components/navbar/navbar'
import { BentoGridDemo } from './components/projects/app'

function App() {

  return (
    <>
    <NavbarDemo/>
    <Homepage/>
    <BentoGridDemo/>
    </>
  )
}

export default App
