import Header from '@/pages/users/header'
import Hero from '@/pages/users/hero'
import InstructorTest from '@/pages/users/instructorTest'
const UserContainer = () => {
  return (
    <div className='bg-primary min-h-screen border'>
        <Header/>
        <Hero/>
        <InstructorTest/>

    </div>
  )
}

export default UserContainer