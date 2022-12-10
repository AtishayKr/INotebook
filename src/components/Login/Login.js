import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Spinner from "../Spinner"

const host = process.env.REACT_APP_API;
// const host = "http://localhost:5000"

export default function Login(props) {
  const { showAlert } = props;

  const [credential, setCredential] = useState({ email: "", password: "", loading: "false" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCredential({loading: "true"})
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();

    setCredential({loading: "false"})
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      showAlert("Logged In successfully", "success");
      navigate("/showNote");
    } else {
      showAlert("Invalid Credential", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  if(credential.loading === "true"){
    return (
      <>
        <Spinner/>
      </>
    )

  } else {
    return (
      <>
        <LoginPage handleSubmit={handleSubmit} onChange={onChange} credential={credential} />
      </>
    )
  }
}
