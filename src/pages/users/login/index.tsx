import Login from '@/components/custom/Login'
import {loginData} from '../../../utils/data/user'
import { makeApiRequest } from '@/apis/functions'

const UserLogin= () => {
  const handleSubmit = (e:Event) => {
    e.preventDefault()
  }
  return (
    <div>
        <Login data={loginData} link='/admin-signup' onSubmit={handleSubmit}/>
    </div>
  )
}

export default UserLogin