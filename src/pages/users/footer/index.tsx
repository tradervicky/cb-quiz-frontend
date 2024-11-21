import { checkAuth } from '@/store/reducers/reducer'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = () => {
  const role = useSelector(state=>state?.auth?.user?.role)
  const isAuth = useSelector(state=>state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth())
  },[])
  return (
    <div className='flex justify-end gap-8 pr-8 h-16 items-center bg-secondary'>
        <p className='text-sm'>Designed and Developed by <a className='underline italic' href="https://www.linkedin.com/in/trader-vicky/" target='_blank'> Vicky Gupta</a></p>
        {(role !=="user" && !isAuth) &&
        <Link to={'/admin/login'} className='bg-btn text-white cursor-pointer   px-4 py-1 rounded-lg'>Admin Login</Link>
}
    </div>
  )
}

export default Footer