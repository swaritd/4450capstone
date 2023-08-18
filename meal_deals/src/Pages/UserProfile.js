import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BusinessSignUp from './BusinessSignUp';
import Axios from 'axios'
import './CSS/UserProfile.css';
import { Button } from 'antd';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userEmail:"",
            userPassword:"",
            userPhoneNumber:"",
            userAddress:"",
            userID:1,
            editUserEmail:"",
            editPassword:"",
            editPhoneNumber:"",
            editAddress:"",
            editID:""
        }
        //this.editUser.bind(this);
      }

    componentDidMount() {
        Axios.post('http://localhost:1001/getUserData',{
            userID : this.state.userID
        }).then(()=>{
            console.log("Successfully sent to db")
        })
        Axios.get('http://localhost:1001/user').then(resp => {
            console.log(resp.data);
            this.setState((state, props) => {
                return {
                    userEmail: resp.data[0].userEmail,
                    userAddress: resp.data[0].userAddress,
                    userPhoneNumber: resp.data[0].userPhoneNumber,
                };
                });

        });
    }
    
    toggleOptions = () =>{
        if(document.getElementById("editValues").hidden=="")
            document.getElementById("editValues").hidden="hidden";
        else
            document.getElementById("editValues").hidden="";
        
    }

    //event.preventDefault();

    editUser = () =>{
        Axios.post('http://localhost:1001/editUser',{
            userEmail : this.state.editUserEmail,
            userPhoneNumber : this.state.editPhoneNumber,
            userAddress : this.state.editAddress,
            userID : this.state.userID,
        }).then(()=>{
            console.log("Successfully sent to db");
            
        })
        setTimeout(() => {
        Axios.get('http://localhost:1001/user').then(resp => {
            console.log(resp.data);
            this.setState((state, props) => {
                return {
                    userEmail: resp.data[0].userEmail,
                    userAddress: resp.data[0].userAddress,
                    userPhoneNumber: resp.data[0].userPhoneNumber,
                };
                });

        });},3000)
      }

      getState = () =>{
        console.log(this.state.userEmail+" "+this.state.userAddress+" "+this.state.userPhoneNumber)
      }
      getEditState = () =>{
        console.log(this.state.editUserEmail+" "+this.state.editPassword+" "+this.state.editPhoneNumber+" "+this.state.editPassword+" "+this.state.editID)
      }

      /*
                  editUserEmail:"",
            editPassword:"",
            editPhoneNumber:"",
            editAddress:"",
            editPassword:"",
            editID:""*/

    render() {
        return(
            <>
                <h2>Your Profile</h2>
                <div className='info'>
                    <label>
                        Email: {this.state.userEmail}
                    </label>
                    <label>
                        Address: {this.state.userAddress}
                    </label>
                    <label>
                        Phone Number: {this.state.userPhoneNumber}
                    </label>
                    <br/>
                    <Button onClick={this.toggleOptions}>Change data</Button>
                    <br/>
                    <div id="editValues" hidden="hidden" style={{marginBottom:10}}>
                        <label>
                            Email
                        </label>
                        <input type="text" onChange={(event)=>{
                        this.setState((state, props) => {
                            return {editUserEmail: event.target.value};
                            });
                        }}/>
                        <label>
                            Address
                        </label>
                        <input type="text" onChange={(event)=>{
                        this.setState((state, props) => {
                            return {editAddress: event.target.value};
                            });
                        }}/>
                        <label>
                            Phone Number
                        </label>
                        <input type="text" onChange={(event)=>{
                        this.setState((state, props) => {
                            return {editPhoneNumber: event.target.value};
                            });
                        }}/>
                        <br style={{marginBottom:10}}/>
                        <div style={{marginTop:10}}>
                            <Button onClick={this.editUser}>Submit</Button>
                            <Button onClick={this.getState} hidden="true">get State</Button>
                            <Button onClick={this.getEditState} hidden="true">get edit State</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UserProfile
