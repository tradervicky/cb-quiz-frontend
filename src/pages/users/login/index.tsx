import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'
import { handleLogin } from '../apiCall'

const UserLogin= () => {


  

  return (
    <div>
        <Login data={loginData} routeLink='/admin-signup' onSubmit={handleLogin}/>
    </div>
  )
}

export default UserLogin