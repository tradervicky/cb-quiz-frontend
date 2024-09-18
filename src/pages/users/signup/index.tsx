import Signup from '@/components/custom/Signup'
import { signupData } from '@/utils/data/user'
import React from 'react'

const AdminCustomSignup = () => {
  return (
    <div>
        <Signup data = {signupData} link='/'/>
    </div>
  )
}

export default AdminCustomSignup