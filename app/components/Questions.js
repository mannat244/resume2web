import React from 'react'
import {useEffect} from 'react'

const Questions=({ques,answer})=>{
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/04fddebb2c.js";
        script.crossOrigin = "anonymous";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []); 
    return(
        <div className='cursor-pointer h-[fit] w-[fit] border-zinc-700 bg-zinc-800 p-3 mb-[16px] border-2 rounded-2xl border-2 hover:shadow-2xl hover:shadow-zinc-600/20'>
            <div className='flex items-center justify-between '>
                <h4 className='text-xl text-white font-semibold' >{ques}</h4>
                <i class="fa-solid fa-caret-down text-white mr-[16px]"></i>
            </div>
            <div className=''>
                <p className='text-sm text-gray-300' >{answer}</p>
            </div>
        </div>
    )
}

export default Questions