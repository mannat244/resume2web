import React, { useState } from 'react'
import {useEffect} from 'react'

const Questions=({ques,answer})=>{
    
    const [view, setview] = useState(false)
    

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
        <div className='cursor-pointer h-[fit] w-[fit] border-zinc-700 bg-zinc-800 p-3 mb-[16px]  rounded-2xl border-2 hover:shadow-2xl hover:shadow-zinc-600/20'>
            <div className='flex items-center justify-between ' onClick={()=>{setview(!view)}}>
                <h4 className='text-xl text-white font-semibold' >{ques}</h4>
                <i className="fa-solid fa-caret-down text-white mr-[16px]  "></i>
                
            </div>
            
            { view && <div>
                <p className='text-base text-gray-300' >{answer}</p>
            </div>}
        </div>
    )
}

export default Questions