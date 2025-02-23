import React from 'react'

const Box = ({heading,para}) =>{
    return(
        <div className='h-[30vh] w-[50vh] bg-zinc-900 flex flex-col basis-64 mr-[100px] '>
            <h2 className='text-2xl text-white font-semibold mb-2 ml-10'>{heading}</h2>
            <p className='text-lg text-white ml-10'>{para}</p>
        </div>
            
        
        
    )
}
export default Box