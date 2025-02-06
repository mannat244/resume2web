import React from 'react'
import Card from './Card'

const Features = () => {
  return (
    <div className='h-[90vh] '>
        <h1 className='text-4xl font-bold mb-8 text-center mt-5' >How Resume2Web Works</h1>
        <Card title="1. Upload Resume" description="Simply upload your PDF resume, and let us do the rest. No coding no hassle-just a few clicks!" image="resume.png"/>
        <Card title="2. Let AI do The Magic!" description="Our powerful Ai extracts your skills, experience, ans projects, transforming them into a stunning portfolio. Customize it to match your style effortlessly." image="resume.png"/>
        <Card title="3. Deploy & Shine" description="Your professional website is ready! Instantly deploy it and share your unique portfolio with the world." image="resume.png"/>
       <div className='h-[20px]'>
        <p></p>
       </div>
    </div>


  )
}

export default Features
