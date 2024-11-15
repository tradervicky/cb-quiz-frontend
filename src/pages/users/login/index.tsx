import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { checkAuth, login, logout } from '@/store/reducers/reducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserLogin= () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate()
  const handleSubmit =(email:string, password:string)=>{
    dispatch(login({ email, password }))
    .then((action)=>{
      if (action.meta.requestStatus === 'fulfilled') {
          navigate('/');
    }})
  }
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
 
  return (
    <div>
        <Login loginData={loginData} routeLink='/user/signup' onSubmit={handleSubmit} />
    </div>
  )
}

export default UserLogin