import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { checkAuth, login, logout } from '@/store/reducers/reducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUrl } from '@/apis/auth';
import { Credentials } from 'interfaces/userReducer';


const UserLogin= () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate()
  const handleSubmit =( email:string, password:string)=>{
    const credentials: Credentials = { email: email, password: password };
    dispatch(login({url: authUrl.USER_LOGIN,credentials}))
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
        <Login loginfor='User' loginData={loginData} routeLink='/user/signup' onSubmit={handleSubmit} />
    </div>
  )
}

export default UserLogin