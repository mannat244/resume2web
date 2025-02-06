import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='bg-black shadow-lg shadow-black/30 h-14 flex justify-center items-center text-white '>
      <img src='/vercel.svg' className='h-8 ml-5 mr-auto'/>
      <div className='flex items-center justify-center font-sans gap-10 font-semibold mr-10'>
      <Link href='/'>Home</Link>
      <Link href='/'>Features</Link>
      <Link href='/'>FAQs</Link>
      <Link href='/'>About</Link>
      </div>
    </div>
  )
}

export default NavBar
