import React, { useContext, useEffect, useState } from "react";
import { dummycontext, logincontext, namecontext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
width:400px;
text-align:center;
justify-content: center;
@media (min-width:0px) and (max-width:600px){
  width:300px;
}
`

const SignIn = () => {
  const { person } = useContext(dummycontext);
  const { setSign } = useContext(logincontext);

  const {name,setName} = useContext(namecontext)
  const [email, setEmail] = useState("");
  const [mailtouch, setMailtouch] = useState(false);
  const [nametouch, setnametouch] = useState(false);
  const [formisValid, setformisValid] = useState(false);

  let namecheck = name.length >= 4;
  let mailvalidate = mailtouch && !email;
  let namevalidate = nametouch && !namecheck;

  useEffect(() => {
    if (email && namecheck) {
      setformisValid(true);
    } else {
      setformisValid(false);
    }
  }, [email, namecheck]);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const namecheckHandler = () => {
    setnametouch(true);
  };

  const mailHandler = (event) => {
    setEmail(event.target.value);
  };

  const mailcheckHandler = () => {
    setMailtouch(true);
  };

  const obj2 = person.find((p) => p.email === email);

  const submitHandler = (e) => {
    e.preventDefault();
    if(!email && !namecheck){
      return;
    }
    setMailtouch(true);
    setnametouch(true);

    if (email && name) {
      if (obj2) {
        setSign(true);

        toast.success("sucessfully loged in", {
          position: "top-center",
        });
      } else {
        toast.warn("You must register to continue..", {
          position: "top-center",
        });
      }

      setEmail("");
      // setName("");
    } else {
      toast.warn("please fill up the details to login!", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <ToastContainer />
        <form className="container py-5 h-100" onSubmit={submitHandler}>
          <div className="row d-flex justify-content-center align-items-center h-80">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <Container>
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        onChange={mailHandler}
                        onBlur={mailcheckHandler}
                        value={email}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="typeEmailX">
                        Email
                        <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    {mailvalidate && (
                      <p style={{ color: "rebeccapurple" }}>
                        please enter your mail !
                      </p>
                    )}
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="typePasswordX"
                        onChange={nameHandler}
                        onBlur={namecheckHandler}
                        value={name}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="typePasswordX">
                        UserName
                        <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    {namevalidate && (
                      <p style={{ color: "rebeccapurple" }}>
                        password must be atleast 4 charcter long
                      </p>
                    )}
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      disabled={!formisValid}
                    >
                      Login
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/reg" className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
        </Container>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
