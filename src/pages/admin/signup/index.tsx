import Signup from '@/components/custom/Signup'
import { signupData } from '@/utils/data/user'
import React from 'react'

const AdminSignup = () => {
  const handleSubmit = ()=>{
    
  }
  return (
    <div>
      <Signup data = {signupData} routeLink='/admin/login'onSubmit={handleSubmit}/>
    </div>
  )
}

export default AdminSignup