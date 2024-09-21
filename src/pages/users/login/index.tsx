import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginProps } from 'interfaces/global';
import { login } from '@/store/reducers/reducer';


const UserLogin= () => {
  const dispatch = useDispatch<AppDispatch>(); 

  const handleSubmit =(email:string, password:string)=>{
    dispatch(login({ email, password }));
  }

  return (
    <div>
        <Login loginData={loginData} routeLink='/admin-signup' onSubmit={handleSubmit}/>
    </div>
  )
}

export default UserLogin