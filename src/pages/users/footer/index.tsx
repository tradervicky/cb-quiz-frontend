import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex justify-end gap-8 pr-8 h-16 items-center bg-secondary'>
        <p className='text-sm'>Designed and Developed by <a className='underline italic' href="https://www.linkedin.com/in/trader-vicky/" target='_blank'> Vicky Gupta</a></p>
        <Link to={'/admin/login'} className='bg-btn text-white cursor-pointer   px-4 py-1 rounded-lg'>Admin Login</Link>
    </div>
  )
}

export default Footer