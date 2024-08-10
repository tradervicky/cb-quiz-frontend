import Login from "./components/custom/Login"
import Signup from "./components/custom/Signup"
import { loginData } from "./utils/data/user"
import { signupData } from "./utils/data/user"
const App = () => {
  return (
    <div>
   

      {/* <Login data={loginData}/> */}
      <Signup data={signupData}/>
    
    </div>
  )
}

export default App