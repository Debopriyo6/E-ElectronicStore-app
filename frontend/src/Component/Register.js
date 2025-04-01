import React, { useContext, useState } from "react";
import { dummycontext, logincontext, namecontext } from "./Context";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Wrapper = styled.div`
   overflow:hidden;
  background-size: cover;
  background-image: url("https://media.istockphoto.com/id/1013435204/photo/businessman-filling-online-registration-form.jpg?s=612x612&w=0&k=20&c=OqVxHQngPfPHNV9baIcqChpiL7Iv5G86bK5Pg0urbTc=");
`;

const Container = styled.div`
width:900px;
text-align:center;
justify-content: center;
@media  (min-width:0px) and (max-width:600px){
  width:300px;
}
`


const Register = () => {
  const { person, setPerson } = useContext(dummycontext);
  const { setLogin } = useContext(logincontext);
  const { name, setName } = useContext(namecontext);
  const [nametouch, setNametouch] = useState(false);
  const [mail, setMail] = useState("");
  const [mailtouch, setMailtouch] = useState(false);
  const [address, setAddress] = useState("");
  const [addresstouch, setAddresstouch] = useState(false);
  const [phno, setPhno] = useState("");
  const [phnotouch, setPhnotouch] = useState(false);
  const [formIsvalid, setformIsvalid] = useState(false);

  const history=useHistory();

  let namecheck = name.length >= 3;
  let addresscheck = address.length >= 4;
  let phonecheck = phno.length === 10;

  let namevalidate = nametouch && !namecheck;
  let addressvalidate = addresstouch && !addresscheck;
  let phonevalidate = phnotouch && !phonecheck;
  let mailvalidate = mailtouch && !mail;

  useEffect(() => {
    if (namecheck && addresscheck && phonecheck && mail) {
      setformIsvalid(true);
    } else {
      setformIsvalid(false);
    }
  }, [namecheck, addresscheck, phonecheck, mail]);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const namecheckHandler = () => {
    setNametouch(true);
  };

  const mailHandler = (e) => {
    setMail(e.target.value);
  };

  const mailtouchHandler = () => {
    setMailtouch(true);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const addresstouchHandler = () => {
    setAddresstouch(true);
  };

  const phnoHandler = (e) => {
    setPhno(e.target.value);
  };

  const phonetouchHandler = () => {
    setPhnotouch(true);
  };

  // const obj = {
  //   pname: name,
  //   email: mail,
  // };

  const user = {
    name: name,
    email: mail,
    address: address,
    phno: phno,
  };

  const obj1 = [user, ...person];

  const submitHandler = (event) => {
    event.preventDefault();
    toast.success("successfully registered", {
      position: "top-center"
    })



    if (!namecheck && !addresscheck && !phonecheck && !mail) {
      return;
    }
    setNametouch(true);
    setMailtouch(true);
    setAddresstouch(true);
    setPhnotouch(true);

    setPerson(obj1);
    

    setLogin(true);

    
      axios.post("http://localhost:8082/postuser", user).then((response) => {
        console.log(response.data);
      });
    

    history.push("/login")
  };

  return (
    <div>
      <section className="h-100 h-custom" >
        <Container className="container py-5 h-100">
          <ToastContainer />
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <design>
                <div className="card rounded-3">
                  <Wrapper>
                    <div className="card-body p-4 p-md-5">
                      <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                        Registration Info
                      </h3>

                      <form className="px-md-2" onSubmit={submitHandler}>
                        <label className="form-label" for="form3Example1q">
                          Name
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example1q"
                            className="form-control"
                            onChange={nameHandler}
                            onBlur={namecheckHandler}
                            value={name}
                          />
                        </div>
                        {namevalidate && (
                          <p style={{ color: "red" }}>
                            name must be atleast 3 character long
                          </p>
                        )}

                        <label className="form-label" for="form3Example1w">
                          Address
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example1w"
                            className="form-control"
                            onChange={addressHandler}
                            onBlur={addresstouchHandler}
                            value={address}
                          />
                        </div>
                        {addressvalidate && (
                          <p style={{ color: "red" }}>
                            address must be atleast 4 character long
                          </p>
                        )}
                        <div className="row">
                          <div className="col-md-6 mb-4"></div>
                        </div>

                        <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                          <label className="form-label" for="form3Example1w">
                            Email
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="form-outline">
                            <input
                              type="email"
                              id="form3Example1w"
                              className="form-control"
                              onChange={mailHandler}
                              onBlur={mailtouchHandler}
                              value={mail}
                            />
                          </div>
                          {mailvalidate && (
                            <p style={{ color: "red" }}>enter your email</p>
                          )}
                          <label className="form-label" for="form3Example1www">
                            Phone Number
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example1www"
                              className="form-control"
                              onChange={phnoHandler}
                              onBlur={phonetouchHandler}
                              value={phno}
                            />
                          </div>
                          {phonevalidate && (
                            <p style={{ color: "red" }}>
                              phone no. must be 10 character long
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={!formIsvalid}
                          className="btn btn-success btn-lg mb-1"
                        >
                          Submit
                        </button>
                      </form>

                      <div className="text-center">
                        <p>
                          Already a member? <Link to="/login">Sign-In</Link>
                        </p>
                      </div>
                    </div>
                  </Wrapper>
                </div>
              </design>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Register;
