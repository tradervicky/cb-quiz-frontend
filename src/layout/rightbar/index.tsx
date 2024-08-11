import { childrenProps } from "interfaces/global"

const Rightbar: React.FC<childrenProps> = (props) => {
  return (
    <div>{props.children}</div>
  )
}

export default Rightbar