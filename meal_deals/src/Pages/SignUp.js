import './../App.css';

import React, { Component, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider } from "firebase/auth";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import app from './../firebase';
import { Button, Input } from 'antd';
import { useRef } from 'react';
import { useNavigate } from "react-router";
import { useUserAuth } from '../authentication/UserAuthContext';


const auth = getAuth();


function SignUp() {
  const [emailForResetPassword, setEmailForResetPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  //Object destructuring login() call from service useUserAuth...
  const { logIn, googleSignIn, user, facebookSignIn, resetPassword } = useUserAuth();
  const navigate = useNavigate();


  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("Account succesfully created! Please wait to be redirected.");
        navigate("/Feed")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        alert(errorCode);
        // ..
      });
  }


  const signIn = async () => {
    try {
      //calling login function from servcie
      await logIn(email, password);
      alert("Login Succesful. Please wait to be redirected.");
      navigate("/Feed")
    } catch (err) {
      console.log("Error on sign-in ", err.code)
      const errorCode = err.code;

      alert(errorCode);
    };
  }

  const signWithGoogle = async () => {
    try {
      const result = await googleSignIn();
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token from google login ", token);
      console.log('Is User active? ', user);
      navigate("/Feed");
    } catch (err) {
      console.log("Error on Google sign-in ", err.code);
      //Todo: showing alert with error message
    }
  }

  const signInWithFacebook = async () => {
    try {
      const result = await facebookSignIn();
      console.log("result from fb login ", result)
      // The signed-in user info.
      const user = result.user;


      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      navigate("/Feed");
      console.log("token from fb login ", accessToken);
    } catch (err) {
      console.log("Error on fb sign-in ", err);
    }
  }

  const forgotPassword = async () => {
    //call firebase send password reset link method
    console.log("entered value in email field ", emailForResetPassword);
    try {
      const result = await resetPassword(emailForResetPassword);
      console.log("result from reset password ", result);
    } catch (err) {
      console.log("Error on reset password link ", err);
    }
  }

  const resetPasswordHandler = async () => {
    if (!showResetPassword) {
      setShowResetPassword(true);
    } else {
      setShowResetPassword(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      Navigate('/Feed')
    } catch (e) {
      setError(e.message)
      console.log(e.message);
    }
  };

  const windowSize = useRef([window.innerWidth, window.innerHeight]);


  return (

    

    <div className="main" style={{ textAlign: "center", justifyItems: 'center', alignItems: "center"}}>

      <h2 style={{}}>Welcome</h2>
      <p style={{}}>Login or signup to get started!</p>
<div>
<img height={150} src="mealDealsLogo.png"/>
</div>
      <div className="App">
        <Input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} style={{ width: "370px", margin: 25 }} />
        <br />
        <Input type={"password"} placeholder="password" onChange={(e) => setPassword(e.target.value)} style={{ width: "370px" }} />
        <br />
        <Button className='defaultBtn' onClick={signUp} style={{ margin: 25 }}>Create Account</Button>
        <Button className='defaultBtn' onClick={signIn} style={{ margin: 25 }}>Sign In</Button>
        {/* <Button onClick={signWithGoogle} style={{ margin: 25 }}>Sign In with Google</Button> */}
        <div div style={{display: 'center', lineHeight: '40px'}}>
        <div onClick={signWithGoogle}>
        <img height={60} src="googleLogin.png" alt="Sign In with Google"/>

         
        </div>

        <div onClick={signInWithFacebook}>
       
        <img height="35" src="facebookLogin.png" alt="Sign In with Facebook" width="167"></img>
         
        </div>

        {/* <Button onClick={signInWithFacebook} style={{ margin: 25 }}>Sign In with Facebook</Button> */}

        <Button className='defaultBtn' onClick={resetPasswordHandler} style={{ margin: 25 }}>Forgot Password</Button>
        <br></br>
        {showResetPassword && <div>
          <Input type={"email"} placeholder="Enter email to reset password" onChange={(e) => setEmailForResetPassword(e.target.value)} style={{ width: "370px", margin: 25 }} />
          <br />
          <Button className='defaultBtn' onClick={forgotPassword} style={{ margin: 25 }}>Submit</Button>
        </div>}
        </div>
        <br />
        
      </div>
      
      {/*<Link to="/restaurantRedirect">
          <Button >I'm a Restaraunt</Button>
        </Link>*/}

    </div>

  );
}

export default SignUp;