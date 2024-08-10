import Login from "./components/custom/Login"
import { loginData } from "./utils/data/user"

const App = () => {
  return (
    <div>
   

      <Login data={loginData}/>
    
    </div>
  )
}

export default App