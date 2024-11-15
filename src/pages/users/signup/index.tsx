import Signup from '@/components/custom/Signup'
import { signupData } from '@/utils/data/user'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { register } from '@/store/reducers/reducer'
import { userSignup } from "interfaces/users";
const UserCustomSignup = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = ({firstName, lastName, email, password} :userSignup)=>{
    dispatch(register({firstName, lastName, email, password }))
  }
  
  return (
    <div>
        <Signup data = {signupData} routeLink='/user/login'onSubmit={handleSubmit}/>
    </div>
  )
}

export default UserCustomSignup