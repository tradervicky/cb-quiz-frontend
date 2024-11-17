import { getInstructorQuiz } from '@/pages/users/apiCall'
import Footer from '@/pages/users/footer'
import Header from '@/pages/users/header'
import Hero from '@/pages/users/hero'
import InstructorTest from '@/pages/users/instructorTest'
import { ReactNode, useEffect, useState } from 'react'
const UserContainer = () => {
  const [instructorData , setInstructorData] = useState([])
  const fetchQuiz = async()=>{
    const response = await getInstructorQuiz()
    setInstructorData(response?.data)

  }
  useEffect(()=>{
    fetchQuiz();
  },[])

  return (
    <div className='bg-primary min-h-screen border'>
        <Header/>
        <Hero/>
        {instructorData?.map((d)=>(

          <InstructorTest data={d}/>
        ))
}
        <Footer/>
    </div>
  )
}

export default UserContainer