import React from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Output from '../components/Output'
import { useGemini } from '../context/Bard'

const Home = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-screen `}>
        <Heading/>
        <Input/>
        <Output/>
    </div>
  )
}

export default Home