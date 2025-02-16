import React from 'react'

const Card = ({title, description, image}) => {
  return (
    <div className='mb-8 ml-20 mr-20 border-2 hover:shadow-2xl hover:shadow-zinc-600/20 border-zinc-700 rounded-2xl h-[50vh] bg-zinc-800 flex items-center'>
    <img src={image} alt='resume' className=' h-[35vh] w-[40vw] rounded-3xl ml-10 object-contain bg-zinc-600' />
    < div className='w-1/2'>

    <h2 className='text-2xl text-white font-semibold mb-2 ml-10'>{title}</h2>

    <p className='text-lg text-white ml-10'>{description}</p>
    </div>
    
  </div>
  )
}

export default Card
