import React, { useContext, useState } from "react";
import { useCart } from "react-use-cart";
import { logincontext } from "./Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Itemcart = () => {
  const{login,sign}=useContext(logincontext);
  const[touch,setTouch]=useState(false);
  const placeOrderHandler=()=>{
    setTouch(true);

    if(!login&&!touch){

      toast.warn("register to buy",{
        position:"top-center"
      }) 
    }
    else if(login){
      toast.warn("login to proceed",{
       position:"top-center"
      })
    }
       else if(login===sign){
        toast.success("order placed",{
          position:"top-center"
        })
        
       }
       
  }
  
  const {
    isEmpty,
    totalUniqueItems,
    totalItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
   } = useCart();

  if (isEmpty) {
    return <h1 className="text-center">Your Cart is Empty</h1>;
  }

  return (
    <section className="py-4 container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-12">
          
          <h5>
            Cart ({totalUniqueItems}) total Items:({totalItems}))
          </h5>
          <table className="table table-light table-hover m-0">
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.img} style={{ height: "6rem" }} alt="..." />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>Quantity :({item.quantity})</td>
                    <td>
                      <button
                        className="btn btn-info ms-2"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <button
                        className="btn btn-info ms-2"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-danger ms-2"
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-auto ms-auto">
          <h2>Total Price:{cartTotal}</h2>
        </div>
        <div className="col-auto">
          <button onClick={() => emptyCart()} className="btn btn-danger m-2">
            Clear Cart
          </button>
        </div>
        <div className="col-auto">
        
          <button onClick={placeOrderHandler} className="btn btn-success m-2">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Itemcart;
