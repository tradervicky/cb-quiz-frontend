import Signup from '@/components/custom/Signup'
import { signupData } from '@/utils/data/user'
import { handleSignup } from '../apiCall'

const AdminCustomSignup = () => {
  
  return (
    <div>
        <Signup data = {signupData} routeLink='/'onSubmit={handleSignup}/>
    </div>
  )
}

export default AdminCustomSignup