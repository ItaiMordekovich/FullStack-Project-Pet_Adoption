import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {toast} from 'react-toastify';
import { LoginUser } from "../../Services/users.service";

export default function Login(props) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  useEffect(() => {
    props.LoginFunc.current = onSubmit   
  }, [])

  const onSubmit = async() =>{
    const email = emailRef.current.value.trim()
    const pass = passwordRef.current.value.trim()
    if(email === "" || pass === "")
    return toast.error("please fill all the fields")
    try{
      const userDetailsNToken = await LoginUser(email, pass)
      props.SignInUser(userDetailsNToken)
    }catch(e){
      console.log(e.response.status)
      if(e.response.status === 401){
        toast.error("Password is incorrect, please try again")
      }else if(e.response.status === 404){
        toast.error("we couldn't find any user with that email, please try again")
      }else{
        toast.error("There was an error while trying to login please, try again later")
      }
    }
  }
  return (
    <form noValidate autoComplete="off">
      <p style={{ fontSize: "18px" }}><strong>Login</strong></p>
      <TextField type={"email"} inputRef={emailRef} variant="standard"  id="login-TextField-Email-Address" label="Email Address" />
      <br />
      <TextField inputRef={passwordRef} type={"password"} variant="standard" id="login-TextField-Password" label="Password" />
    </form>
  );
}
