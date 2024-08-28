import React from 'react'

const Footer = () => {
    return (
        <div className='bg-violet-400 text-white flex  flex-col justify-center items-center  w-full'>
            <div className='flex gap-5'> 
                <div className='py-2'><span className='text-violet-950'>Wings </span>Password
                    <span className=' text-violet-950'> Manager </span></div>
            </div>
            <div className='flex justify-center items-center pb-3'> Created with <lord-icon
                src="https://cdn.lordicon.com/jjoolpwc.json"
                trigger="morph"
                stroke="bold"
                state="morph-glitter"
                colors="primary:#320a5c,secondary:#4f1091"
                className="w-9 h-9">
            </lord-icon> by DynamicPhillic </div>
        </div>
    )
}

export default Footer