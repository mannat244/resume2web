import React, { forwardRef } from 'react'
import Card from './Card'

const Features = forwardRef(( props,ref) => {
  return (
    <div ref={ref} className='h-[fit] bg-zinc-900  '>
        <h1 className='text-4xl font-bold text-center  text-white mb-20 p-[20px]' >How Resume2Web Works</h1>
        <Card title="1. Upload Resume" description="Simply upload your PDF resume, and let us do the rest. No coding no hassle-just a few clicks!" image="1.png"/>
        <Card title="2. Let AI Do The Magic!" description="Our powerful AI extracts your skills, experience, and projects, transforming them into a stunning portfolio. Customize it to match your style effortlessly." image="2.png"/>
        <Card title="3. Deploy & Shine" description="Your professional website is ready! Instantly deploy it and share your unique portfolio with the world." image="3.png"/>
       <div className='h-[20px]'>
        <p></p>
       </div>
    </div>


  )
})

export default Features
