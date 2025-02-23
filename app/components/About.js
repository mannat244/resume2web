import React from 'react'
import Box from './Box'

const About = () => {
  return (
   <div className="bg-zinc-800 h-[600px]">
        <h1 className='text-4xl font-bold text-center  text-white p-[20px] '>About</h1>
        <div  className='flex flex-row flex justify-center '>
        <Box heading="Automated Conversion" para="Upload your resume, and our system will generate a sleek, professional website in seconds."/>
        <Box heading="Customizable Designs" para="Choose from a variety of themes and styles to match your professional identity."/>
        <Box heading="SEO & Mobile Optimized" para="Your website is fully responsive and optimized for search engines to boost visibility."/>
        </div>
        
   </div>

  )
}

export default About