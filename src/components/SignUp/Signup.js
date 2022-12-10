import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";
import Spinner from "../Spinner"
// import SignupPage from "./SignupPage";

const REACT_APP_API = process.env.REACT_APP_API;
// const REACT_APP_API = "http://localhost:5000"

export default function Signup(props) {
  const { showAlert } = props;
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
    loading: "false"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.cnfPassword) {
      showAlert("password does not match", "danger");
      return;
    }
    
    setSignupData({loading: "true"})
    const response = await fetch(`${REACT_APP_API}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      }),
    });
    const json = await response.json();
    // console.log(json.success,json.authtoken);
    setSignupData({loading: "false"})
    if (json.success) {
      // localStorage.setItem("token", json.authtoken);
      navigate("/login");
      showAlert("Account created successfully", "success");
    } else {
      showAlert("User already exists", "danger");
    }
  };
  const onChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  if(signupData.loading === "true"){
    console.log(signupData.loading)
    return (
      <>
      <Spinner/>
      </>
    )
  }else {
    console.log(signupData.loading)
    return (<>
      <SignupPage handleSubmit={handleSubmit} onChange={onChange} signupData={signupData} />
    </>)
  }
}
