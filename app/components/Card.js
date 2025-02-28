import React from 'react'

const Card = ({title, description, image}) => {
  return (
    <div className='mb-8 mx-auto border-2 hover:shadow-2xl hover:shadow-zinc-600/20 border-zinc-700 rounded-2xl h-fit md:h-[50vh] bg-zinc-800 flex w-[90vw] justify-center flex-wrap items-center'>
    <img src={image} alt='resume' className=' md:h-[35vh] md:mt-0 mt-10 w-[80vw] md:w-[40vw] rounded-3xl md:ml-10 object-contain bg-zinc-600' />
    <div className='md:w-1/2 flex my-8 md:my-0 flex-wrap'>

    <h2 className='text-2xl text-white font-semibold mb-2 ml-10'>{title}</h2>
    <p className='text-lg text-white ml-10'>{description}</p>
    </div>
    
  </div>
  )
}

export default Card
