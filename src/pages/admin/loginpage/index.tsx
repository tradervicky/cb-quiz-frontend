import Login from '@/components/custom/Login'
import { loginData } from '@/utils/data/user'
import React from 'react'

const AdminLogin = () => {
  const handleSubmit = ()=>{
    
  }
  return (
    <div>
         <Login loginData={loginData} routeLink='/admin-signup' onSubmit={handleSubmit} />
    </div>
  )
}

export default AdminLogin