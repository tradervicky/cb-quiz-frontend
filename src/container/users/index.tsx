import Footer from '@/pages/users/footer'
import Header from '@/pages/users/header'
import Hero from '@/pages/users/hero'
import InstructorTest from '@/pages/users/instructorTest'
import { ReactNode } from 'react'
const UserContainer = () => {
  return (
    <div className='bg-primary min-h-screen border'>
        <Header/>
        <Hero/>
        <InstructorTest/>
        <Footer/>
    </div>
  )
}

export default UserContainer