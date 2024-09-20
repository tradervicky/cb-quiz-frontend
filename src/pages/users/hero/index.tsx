import UserIcons from '@/components/usericons'
import React from 'react'


const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row px-8 sm:px-20 items-center bg-primary'>
        <div className='w-full sm:w-[40%]'>
            <h1 className='text-btn text-3xl sm:text-5xl font-bold tracking-wider leading-tight pb-2'>Master your Skills with quizApp</h1>
            <span className='text-sm '>Are you tired of all-nighters and still struggling to keep with your coursework?</span>

            <div className='flex flex-col  sm:flex-row gap-8 sm:gap-16 pt-8 sm:pl-10'>
                <button className='px-4 py-2 rounded-3xl bg-btn text-white '>Get Started</button>
                <div className='flex '>
                <UserIcons/>
                <div className='pl-28'>
                <p className='text-xs font-semibold text-btn'>
                42k + 
                </p> 
                <span className='text-xs font-semibold text-btn'>Using this app</span>
                </div>
                
                </div>
            </div>
        </div>
        <div className='w-full sm:w-[60%] flex justify-center  mix-blend-multiply sm:h-[95vh]'>
            <img src="/images/hero.jpg" alt="" className='object-cover h-full'/>
        </div>
    </div>
  )
}

export default Hero