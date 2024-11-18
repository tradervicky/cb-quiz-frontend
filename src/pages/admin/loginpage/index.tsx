import { authUrl } from '@/apis/auth';
import Login from '@/components/custom/Login'
import { checkAuth, login } from '@/store/reducers/reducer';
import { AppDispatch } from '@/store/store';
import { loginData } from '@/utils/data/user'
import { Credentials } from 'interfaces/userReducer';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate()
  const handleSubmit =( email:string, password:string)=>{
    const credentials: Credentials = { email: email, password: password };
    dispatch(login({url: authUrl.ADMIN_LOGIN,credentials}))
    .then((action)=>{
      if (action.meta.requestStatus === 'fulfilled') {
          navigate('/dashboard');
    }})
  }
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  return (
    <div>
         <Login loginfor='Admin' loginData={loginData} routeLink='/admin/signup' onSubmit={handleSubmit} />
    </div>
  )
}

export default AdminLogin