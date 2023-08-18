import './../App.css';
import React, {Component, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import app from './../firebase';
import { Button, Input } from 'antd';
import { useRef } from 'react';
import Axios from 'axios'

function BusinessSignUp() {
    
    const [restaurantName, setRestaurantName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    
    const addRestaurant = () =>{
        Axios.post('http://localhost:1001/createRestaurant',{
            restaurantName:restaurantName,
            phoneNumber:phoneNumber,
            address:address,
        }).then(()=>{
            console.log("Successfully sent to db")
        })
      }
    
    return(
        <>
            <div style={{textAlign:"center",justifyItems:'center',alignItems:"center"}}>
                <h2 >Restaurant Log In / Sign Up</h2>                     
                <Input type="text" name="restaurantName" style={{width: "370px",margin:12.5}} placeholder="Restaurant Name"
                onChange={(event)=>{
                    setRestaurantName(event.target.value)
                    }}/>
                <br/>
                <Input type="text" name="phoneNumber" style={{width: "370px",margin:12.5}} placeholder="Phone Number"
                onChange={(event)=>{
                        setPhoneNumber(event.target.value)
                    }} />
                <br/>  
                <Input type="text" name="address" style={{width: "370px",margin:12.5}} placeholder="Address"
                onChange={(event)=>{

                        setAddress(event.target.value)
                    }} />
                <br/>
                {/*<Button style={{marginRight:12.25,marginTop:12.25}} onClick={this.getState}>click Me</Button>*/}
                <Link to="/RestuarantProfile">
                <Button style={{marginLeft:12.25,marginTop:12.25}} onClick={addRestaurant}>send</Button>
                </Link>
                <br/>
                <Link to="/">
                <Button>I am a Customer</Button>
                 </Link>
                {/*<Link to="/">
                    <Button>I am a customer</Button>
                </Link>*/}
            </div>

        </>
    )
}
    export default BusinessSignUp;