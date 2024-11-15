import { Button } from '@/components/ui/button'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-end gap-8 pr-8 h-16 items-center bg-secondary'>
        <p className='text-sm'>Designed and Developed by <a className='underline italic' href="https://www.linkedin.com/in/trader-vicky/" target='_blank'> Vicky Gupta</a></p>
        <p className='bg-btn text-white cursor-pointer   px-4 py-1 rounded-lg'>Admin Login</p>
    </div>
  )
}

export default Footer