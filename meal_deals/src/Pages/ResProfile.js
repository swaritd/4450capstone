import { React,useState, useEffect } from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BusinessSignUp from './BusinessSignUp';
import Axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

function RestuarantProfile(){

    const [name, setRestaurantName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [resID, setresID] = useState("");
    const [editName, seteditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editPhoneNumber, seteditPhoneNumber] = useState("");

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
                    Axios.post('http://localhost:1001/getResData',{
            resID : this.state.resID
        }).then(()=>{
            console.log("Successfully sent to db")
        })
          ).json();
    
          // set state when the data received
          setData(data);
        };
    
        dataFetch();
      }, []);

    const componentDidMount = () =>{
        Axios.post('http://localhost:1001/getResData',{
            resID : this.state.resID
        }).then(()=>{
            console.log("Successfully sent to db")
        })
        
        Axios.get('http://localhost:1001/restaurants').then(resp => {
            console.log(resp.data);
            this.setState((state, props) => {
                return {
                    name: name,
                    phoneNumber: address,
                    address: phoneNumber,
                };
                });

        });
    }
    
    const toggleOptions = () =>{
        if(document.getElementById("editValues").hidden=="")
            document.getElementById("editValues").hidden="hidden";
        else
            document.getElementById("editValues").hidden="";
        
    }

    //event.preventDefault();

    const editUser = () =>{
        Axios.post('http://localhost:1001/editRestaurant',{
            restaurantName : name,
            phoneNumber : phoneNumber,
            address : address,
            restaurantID : resID
        }).then(()=>{
            console.log("Successfully sent to db");
            
        })
        setTimeout(() => {
        Axios.get('http://localhost:1001/restaurants').then(resp => {
            console.log(resp.data);
            setRestaurantName(resp.data[0].restaurantName);
            setAddress(resp.data[0].address);
            setPhoneNumber(resp.data[0].phoneNumber);
        });},3000)
    }

    const getState = () =>{
    console.log(name+" "+address+" "+phoneNumber)
    }
    const getEditState = () =>{
    console.log(editAddress+" "+editName+" "+editPhoneNumber)
    }

      /*
                  editUserEmail:"",
            editPassword:"",
            editPhoneNumber:"",
            editAddress:"",
            editPassword:"",
            editID:""*/

        return(
            <>
                <h2>Your Profile</h2>
                <div>
                    <label>
                        Restaurant Name: {name}
                    </label>
                    <label>
                        Address: {address}
                    </label>
                    <label>
                        Phone Number: {phoneNumber}
                    </label>
                    <br/>
                    <button onClick={this.toggleOptions}>Change data</button>
                    <br/>
                    <div id="editValues" hidden="hidden">
                        <label>
                            Restaurant Name
                        </label>
                        <input type="text" onChange={(event)=>{
                            editName(event.target.value)
                        }}/>
                        <label>
                            Address
                        </label>
                        <input type="text" onChange={(event)=>{
                        this.setState((state, props) => {
                            editAddress(event.target.value)
                            });
                        }}/>
                        <label>
                            Phone Number
                        </label>
                        <input type="text" onChange={(event)=>{
                        this.setState((state, props) => {
                            editPhoneNumber(event.target.value)
                            });
                        }}/>
                        <br/>
                        <button onClick={editUser}>Submit</button>
                        <button onClick={getState}>get State</button>
                        <button onClick={getEditState}>get edit State</button>
                    </div>
                </div>
            </>
        )
    }   
export default RestuarantProfile