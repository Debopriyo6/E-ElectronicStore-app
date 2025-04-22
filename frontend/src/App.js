import { useEffect, useState } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { itemcontext } from "./Component/Context";
import SignIn from "./Component/SignIn";
import ItemFetch from "./Component/ItemFetch";
import Register from "./Component/Register";
import { dummycontext } from "./Component/Context";
import { logincontext } from "./Component/Context";
import { namecontext } from "./Component/Context";
import Itemcart1 from "./Component/Itemcart1";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function App() {
  const [item, Setitem] = useState([]);
  const [person, setPerson] = useState([]);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [sign, setSign] = useState(false);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
 


  useEffect(() => {
    axios.get("http://3.110.204.171:8086/backend-0.0.1-SNAPSHOT/getitem").then((response) => {
      console.log(response);
      Setitem(response.data);
    });
  }, []);
  //http://15.207.112.233:8086
  //http://15.207.112.233-->this is ip of docker host, 8086:port on which container is running


  useEffect(() => {
    axios.get("http://3.110.204.171:8086/backend-0.0.1-SNAPSHOT/user").then((response) => {
      console.log(response);
      
      setPerson(response.data);
    });
  }, []);

  let size = cart.length;

  const handleaddtoCart = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 1000);
      return;
    }
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    let i = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) 
      i = index;
      
    });

    const temp = cart;
    temp[i].amount += d;
    if (temp[i].amount === 0) temp[i].amount = 1;
    setCart([...temp]);
  };
   
  return (
    
    <div>
      <ToastContainer />
      <logincontext.Provider
        value={{ login, setLogin, sign, setSign, warning }}
      >
        <dummycontext.Provider value={{ person, setPerson }}>
          <itemcontext.Provider
            value={{
              item,
              Setitem,
              cart,
              setCart,
              size,
              handleaddtoCart,
              handleChange,
            }}
          >
            <namecontext.Provider value={{ name, setName }}>
              <Navbar />
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/home"></Redirect>
                </Route>
                <Route path="/home">
                  <Home></Home>
                </Route>
                <Route path="/services">
                  <ItemFetch />
                </Route>
                <Route path="/reg">
                  <Register />
                </Route>
                <Route path="/login">
                  <SignIn></SignIn>
                </Route>

                <Route path="/bill">
                  <Itemcart1 />
                </Route>
                {warning &&
                  toast.warning(" item already added", {
                    position: "top-right",
                  })}
              </Switch>
            </namecontext.Provider>
          </itemcontext.Provider>
        </dummycontext.Provider>
      </logincontext.Provider>
    </div>
   
  );
}

export default App;
