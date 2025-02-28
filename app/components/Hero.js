"use client"
import React, { useRef , useEffect, useState, forwardRef } from 'react'
import Typed from 'typed.js';


const Hero = forwardRef((props , ref) => {

  const heroText = useRef()
  const [subtitle, setsubtitle] = useState(false)

  useEffect(() => {
    const typed = new Typed(heroText.current, {
      strings: ["Turn Your Resume into a Stunning Website in Minutes!"], // Plain text
      typeSpeed: 30,
      showCursor: false,
      onStringTyped: () => {
        heroText.current.innerHTML = `
          Turn Your 
          <span class=' transition-opacity duration-500 bg-gradient-to-r from-blue-600 via-indigo-400 to-green-400 text-transparent bg-clip-text'>Resume</span> 
          into a 
          <span class=' transition-opacity duration-500 bg-gradient-to-r from-indigo-400 via-red-400 to-pink-400 text-transparent bg-clip-text'>Stunning Website</span> 
          in Minutes!
        `;

        setsubtitle(true)
      },
    });
  
    return () => {
      typed.destroy()
    }
  }, [])
  

  return (
    <div ref={ref} className='h-[100svh] flex flex-col justify-center items-center bg-zinc-900'>
      <h1 ref={heroText} className='duration-500 text-[60px] md:text-[90px] font-bold text-center bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-100 bg-clip-text text-transparent leading-none font-sans'></h1>
      <p
  className={`transition-opacity duration-500 max-w-[80%] md:max-w-[50%] text-center text-white mt-10 ${
    subtitle ? "opacity-100" : "opacity-0"
  }`}
>
  Instantly generate a professional portfolio from your resume—no coding
  required. Showcase your skills, projects, and experience with a sleek,
  customizable design.
</p>
     <button className={`${subtitle ? "opacity-100" : "opacity-0"} transition-opacity duration-500 hover:bg-white rounded-full hover:text-black text-white font-bold hover:shadow-md shadow-black/20 px-8 py-2 mx-auto mt-16 md:mt-24 border-white border-3`} onClick={props.func} >Get Started</button>
    </div>
  )
})

export default Hero
