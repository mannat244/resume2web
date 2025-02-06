import React from 'react'

const Card = ({title, description, image}) => {
  return (
    <div className='mb-8 ml-20 mr-20 border-2 border-zinc-300 rounded-xl h-[50vh] bg-zinc-300 flex items-center'>
    <img src={image} alt='resume' className=' h-[35vh] w-[40vw] rounded-xl ml-10 object-contain bg-red-600' />
    < div className='w-1/2'>

    <h2 className='text-2xl font-semibold mb-2 ml-10'>{title}</h2>

    <p className='text-lg ml-10'>{description}</p>
    </div>
    
  </div>
  )
}

export default Card
