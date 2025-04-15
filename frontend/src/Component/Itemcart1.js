import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { itemcontext, logincontext, namecontext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 900px;
  align-items: center;
  justify-content: center;
`;

const Itemcart1 = () => {
  const { cart, setCart, handleChange } = useContext(itemcontext);
  const { name } = useContext(namecontext);
  const [price, Setprice] = useState(0);

  const { sign } = useContext(logincontext);

  const placeOrderHandler = () => {
    if (sign) {
      toast.success("order placed", {
        position: "top-center",
      });
    } else {
      toast.warn("login to buy", {
        position: "top-center",
      });
    }
    const bill = {
      pname: name,

      total_price: price,
    };

    const a = sign;

    a &&
      axios.post("http://15.207.112.233:8086/getbill", bill).then((response) => {
        console.log(response.data);
      });
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => {
      return (ans += item.amount * item.price);
    });
    Setprice(ans);
  };
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);

    setCart(arr);
    // handlePrice();
  };

  useEffect(() => {
    handlePrice();
  });

  if (cart.length === 0) {
    return <h1 className="text-center">Your Cart is Empty!!</h1>;
  }

  return (
    <section className="py-4 container">
      <ToastContainer />
      <div className="row justify-content-center">
        <Container>
          <div className="col-12">
            <table className="table table-light table-hover m-0">
              <tbody>
                {cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={item.image}
                          style={{ height: "6rem" }}
                          alt="..."
                        />
                      </td>
                      <td>{item.itemname}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={() => handleChange(item, +1)}
                          className="btn btn-info ms-2"
                        >
                          +
                        </button>

                        <button className="btn btn-primary ms-2">
                          {item.amount}
                        </button>

                        <button
                          onClick={() => handleChange(item, -1)}
                          className="btn btn-info ms-2"
                        >
                          -
                        </button>

                        <button
                          onClick={() => handleRemove(item.id)}
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
            <h2>Total Price:{price}</h2>
          </div>
          <div className="col-auto">
            <button onClick={placeOrderHandler} className="btn btn-success m-2">
              Place Order
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Itemcart1;
