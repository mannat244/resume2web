import React, { forwardRef } from "react";
import Box from './Box'

const About = forwardRef((props,ref) => {
  return (
   <div ref={ref} className="bg-zinc-900 h-[fit] w-[full] px-5 pb-12">
        <h1 className='text-4xl font-bold text-center  text-white p-[10px]  '>Features</h1>
        <div  className=' flex gap-5 mx-auto justify-around flex-wrap w-[90vw] md:flex-nowrap'>
        <Box heading="Automated Conversion" para="Upload your resume, and our system will generate a sleek, professional website in seconds."/>
        <Box heading="Customizable Designs" para="Choose from a variety of themes and styles to match your professional identity."/>
        <Box heading="SEO & Mobile Optimized" para="Your website is fully responsive and optimized for search engines to boost visibility."/>
        </div>
        
   </div>

  )
})

export default About