import {  useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
// import Logout from "./Component/Logout";



function App() {
  // const Dummy = [
  //   { pname: "Rakseh", email: "rakesh@gmail.com" },
  //   { pname: "Mukesh", email: "mukesh@gmail.com" },
  //   { pname: "Sandip", email: "sandip@gmail.com" },
  //   { pname: "Raj", email: "raj@gmail.com" },
  // ];
//   const Item = [
//     {
//       id: 1,
//       itemname: "laptop",
//       description: "high performance",
//       price: 72000,
//        amount:1,
//       image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5713/5713176cv1d.jpg",
//     },
//     {
//       id: 2,
//       itemname: "Fridge",
//       description: "Equiped with modern features",
//       price: 44000, 
// amount:1,
//       image: "https://tse1.mm.bing.net/th?id=OIP.xeafvxVoKmo4l1u-x1P9jwHaHa&pid=Api&P=0",
//     },
//     {
//       id: 3,
//       itemname: "Mixer",
//       description: "easy to use",
//       price: 12000,
// amount:1,
//       image: "https://tse3.mm.bing.net/th?id=OIP.Mxk_f2QASVnAoOesfH9izAHaHa&pid=Api&P=0",
//     },
//     {
//       id: 4,
//       itemname: "Inverter-AC",
//       description: "fast cooling with air filteration",
//       price: 58000,
// amount:1,
//       image: "https://tse2.mm.bing.net/th?id=OIP.SEOV6-N-jSjz6QCl-Nf51QHaDx&pid=Api&P=0",
//     },
//     {
//       id: 5,
//       itemname: "Chimney",
//       description: "kitchen friendly",
//       price: 22000,
// amount:1,
//       image: "https://tse1.mm.bing.net/th?id=OIP.y-zV9ygTFGTLbU6T4Ay4TgHaHa&pid=Api&P=0",
//     },
//     {
//       id: 6,
//       itemname: "Geyser",
//       description: "fast heating capacity",
//       price: 8000,
// amount:1,
//       image: "https://www.compareprix.in/images/product/large/haier-es15v-15-litre-storage-water-geyser-large.jpeg",
//     },
//     {
//       id: 7,
//       itemname: "headset",
//       description: "High quality sound with noise cancellation",
//       price: 4000,
// amount:1,
//       image: "https://i5.walmartimages.com/asr/42187bbb-d303-49b7-9f08-bbba8c78d9d8_1.93d8ecf6cb88fe0f4c306fa682a6ff58.jpeg",
//     },
//     {   
//       id: 8,
//       itemname: "LED-TV",
//       description: "Hd quality",
//       price: 34000,
//       amount:1,
//       image: "https://tse4.mm.bing.net/th?id=OIP.0y6hys_3Ztl5XUfgTGd0gwHaHa&pid=Api&P=0",
//     },
    
//   ];




  
  
  const [item, Setitem] = useState([]);
  const [person, setPerson] = useState([]);
  const [login, setLogin] = useState(false);
  const[name,setName]=useState("");
  const[sign,setSign]=useState(false);
  const[cart,setCart]=useState([]);
  const[warning,setWarning]=useState(false);

  useEffect(()=>{
   axios.get("http://localhost:8082/getitem")
   .then((response)=>{
    console.log(response);
    Setitem(response.data);
   })
  },[])


  useEffect(()=>{
 axios.get("http://localhost:8082/user")
 .then((response)=>{
  console.log(response)
  setPerson(response.data)
 })
  },[])

   let size=cart.length;

   const handleaddtoCart=(item)=>{
    let isPresent=false;
    cart.forEach((product)=>{
          if(item.id===product.id)
          isPresent=true;
    })
    if(isPresent){
      setWarning(true);
      setTimeout(()=>{
         setWarning(false);
      },100)
      return;
    }
    setCart([...cart,item]);
  }


  const handleChange=(item,d)=>{
  let i=-1;
  cart.forEach((data,index)=>{
  if(data.id===item.id)
     i=index;
  });

  const temp=cart;
  temp[i].amount+=d;
  if(temp[i].amount===0)
  temp[i].amount=1;
  setCart([...temp]);
  }



  

  return (
    <div>
     <ToastContainer/>
      <logincontext.Provider value={{ login, setLogin,sign,setSign,warning}}>
        <dummycontext.Provider value={{ person, setPerson}}>
          <itemcontext.Provider value={{ item, Setitem ,cart,setCart,size,handleaddtoCart,handleChange}}>
            <namecontext.Provider value={{name,setName}}>
            
        
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

              <Route path='/bill'>
               <Itemcart1/>
               </Route>
               {warning && toast.warning(" item already added",{
                position:"top-right"
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
