import { useContext } from "react";
import { logincontext } from "./Context";

const Logout=()=>{
    const{setSign}=useContext(logincontext);
    
    const logoutHandler=()=>{
        setSign(false)
    }

return(<div>
      <h1 onClick={logoutHandler}>..</h1>
</div>)
}
export default Logout;