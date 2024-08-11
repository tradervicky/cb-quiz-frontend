import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'

const UserLogin= () => {
  return (
    <div>
        <Login data={loginData}/>
    </div>
  )
}

export default UserLogin