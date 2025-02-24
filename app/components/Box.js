import React from 'react'

const Box = ({heading,para}) =>{
    return(
        <div className='h-[fit] w-[350px] bg-zinc-800 flex flex-col basis-64 p-6 mt-[50px] border-2 hover:shadow-2xl hover:shadow-zinc-600/20 border-zinc-700 rounded-2xl '>
            <h2 className='text-2xl text-white font-semibold  '>{heading}</h2>
            &nbsp;
            <p className='text-lg text-white  '>{para}</p>
        </div>
            
        
        
    )
}
export default Box