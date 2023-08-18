import React, { useEffect,useState,createElement} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BusinessSignUp from './BusinessSignUp';
import Axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Input } from 'antd';
import { async } from '@firebase/util';
import './CSS/RestuarantProfile.css';

function RestaurantProfile(){

    const [name, setRestaurantName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [resID, setResID] = useState(101);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editPhoneNumber, setEditPhoneNumber] = useState("");
    const [menuItemID, setMenuItemID] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);


    useEffect(() => {
        try{
            Axios.post('http://localhost:1001/getResData',{
                resID: resID
            }).then(
                console.log("Connected to db, resID "+resID)
            )
            Axios.get('http://localhost:1001/restaurants').then(resp => {
                setRestaurantName(resp.data[0].restaurantName)
                setPhoneNumber(resp.data[0].phoneNumber)
                setAddress(resp.data[0].address)
            })
            Axios.get('http://localhost:1001/getMenuItems').then(resp => {
                console.log(resp.data.length);
                  let list = []
                  let list2 = []
                  let count = 0
                  for (let i = 0; i < resp.data.length; i++) {
                    if(count==0){
                        list2.push(resp.data[i].itemName)
                        count++
                    }
                    if(count==1){
                        list2.push(resp.data[i].itemPrice)
                        count++
                        }
                    if(count==2){
                        list2.push(resp.data[i].itemQuantity)
                        count++
                    }
                    if(count==3){
                        list2.push(resp.data[i].itemID)
                        list.push(list2)
                        list2=[]
                        count=0
                    }
                  }
                  setItems(list);
                  console.log(list)
            })
        }
        catch(err){
            console.log(err)
        }
        return()=>{
        }
    
    },[])

    const getMenuItems = () =>{
            Axios.get('http://localhost:1001/getMenuItems').then(resp => {
                  let list = []
                  let list2 = []
                  let count = 0
                  for (let i = 0; i < resp.data.length; i++) {
                    if(count==0){
                        list2.push(resp.data[i].itemName)
                        count++
                    }
                    if(count==1){
                        list2.push(resp.data[i].itemPrice)
                        count++
                        }
                    if(count==2){
                        list2.push(resp.data[i].itemQuantity)
                        count++
                    }
                    if(count==3){
                        list2.push(resp.data[i].itemID)
                        list.push(list2)
                        list2=[]
                        count=0
                    }
                  }
                  setItems(list);
                })

        }

    
    const toggleOptions = () =>{
        if(document.getElementById("editValues").hidden=="")
            document.getElementById("editValues").hidden="hidden";
        else
            document.getElementById("editValues").hidden="";
        
    }

    const toggleCancel = ()=>{
        if(document.getElementById("outerRemove").hidden=="")
            document.getElementById("outerRemove").hidden="hidden";
        else
            document.getElementById("outerRemove").hidden="";
        
    }
    const toggleEdit = ()=>{
        if(document.getElementById("outerEdit").hidden=="")
            document.getElementById("outerEdit").hidden="hidden";
        else{
            document.getElementById("outerEdit").hidden="";
        }
        
    }

    const toggleAdd = ()=>{
        if(document.getElementById("outerAdd").hidden=="")
            document.getElementById("outerAdd").hidden="hidden";
        else
            document.getElementById("outerAdd").hidden="";
        
    }

    const removeItem = ()=>{
        Axios.post('http://localhost:1001/deleteMenuItem',{
            itemID:item[3]
        }).then(
            console.log("Connected to db, resID "+resID)
        ).then(
            Axios.get('http://localhost:1001/getMenuItems').then(resp => {
                console.log(resp.data.length);
                  let list = []
                  let list2 = []
                  let count = 0
                  for (let i = 0; i < resp.data.length; i++) {
                    if(count==0){
                        list2.push(resp.data[i].itemName)
                        count++
                    }
                    if(count==1){
                        list2.push(resp.data[i].itemPrice)
                        count++
                        }
                    if(count==2){
                        list2.push(resp.data[i].itemQuantity)
                        count++
                    }
                    if(count==3){
                        list2.push(resp.data[i].itemID)
                        list.push(list2)
                        list2=[]
                        count=0
                    }
                  }
            })
        )
    }

    const addMenuItem = () =>{
        Axios.post('http://localhost:1001/addMenuItem',{
            itemName: itemName,
            itemPrice: ("$"+itemPrice),
            itemQuantity: itemQuantity,
            restaurantID: resID,
        }).then(()=>{
            console.log("Successfully sent to db")
        })
      }


    const editUser = () =>{
        Axios.post('http://localhost:1001/editRestaurant',{
            restaurantName : editName,
            phoneNumber : editPhoneNumber,
            address : editAddress,
            restaurantID : resID,
        }).then(()=>{
            console.log("Successfully sent to db")
        })
        Axios.get('http://localhost:1001/restaurants').then(resp => {
            setRestaurantName(resp.data[0].restaurantName)
            setPhoneNumber(resp.data[0].phoneNumber)
            setAddress(resp.data[0].address)
        })
    }

    const editItem = () =>{
        console.log(itemName+" "+itemPrice+" "+itemQuantity+" This is menuID "+menuItemID)
        Axios.post('http://localhost:1001/editMenuItem',{
            itemName : itemName,
            itemPrice : "$"+itemPrice,
            itemQuantity : itemQuantity,
            itemID : menuItemID,
        }).then(()=>{
            console.log("Successfully sent to db")
        })
    }

    //Taken from online
    function setNativeValue(element, value) {
        let lastValue = element.value;
        element.value = value;
        let event = new Event("input", { target: element, bubbles: true });
        // React 15
        event.simulated = true;
        // React 16
        let tracker = element._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
    }




    let itemMap = items.map(item =>
        <div className='menuItems'>
            <p>{item[0]}</p>
            <p>{"Price: "+item[1]}</p>
            <p>{"Quantity: "+item[2]}</p>
            <Button onClick={()=>{
                toggleEdit()
                setMenuItemID(item[3])
                setItem(item)
            }}
            >Edit</Button>
            <Button onClick={()=>{
                toggleCancel()
                setItem(item)
                setMenuItemID(item[3])
            }}>Remove</Button>
        </div>)
    

    const getState = () =>{
    console.log(name+" "+address+" "+phoneNumber)
    }
    const getEditState = () =>{
    console.log(editAddress+" "+editName+" "+editPhoneNumber)
    }

        return(
            <>
                <div style={{}}>
                    <h2>Your Profile</h2>
                    <label className='firstLabels'>
                        Restaurant Name: {name}
                    </label>
                    <br/>
                    <label className='firstLabels'>
                        Address: {address}
                    </label>
                    <br/>
                    <label className='firstLabels'>
                        Phone Number: {phoneNumber}
                    </label>
                    <br/>
                    <Button  id="changeBtn" onClick={toggleOptions}>Change data</Button>
                    <br/>
                    <div id="editValues" hidden="hidden">
                        <br/>
                        <div >
                        <label id="firstInputLabel">
                            Restaurant Name
                        </label>
                        <input type="text" id = "firstInputBox" onChange={(event)=>{
                            setEditName(event.target.value)
                            
                        }}/>
                        </div>
                        <br/>
                        <div>
                            <label id="secondInputLabel">
                                Address
                            </label>
                            <input type="text" id = "secondInputBox" onChange={(event)=>{
                            setEditAddress(event.target.value)
                            }}/>
                        </div>
                        <br/>
                        <div>
                        <label id="thirdInputLabel">
                            Phone Number
                        </label>
                        <input type="text" id = "thirdInputBox" onChange={(event)=>{
                        setEditPhoneNumber(event.target.value)
                        }}/>
                        </div>
                        <br/>
                        <Button onClick={editUser}>Submit</Button>
                        <Button onClick={getState}>get State</Button>
                        <Button onClick={getEditState}>get edit State</Button>
                    </div>
                    <h2 style={{marginTop:35}}>Your Menu</h2>
                    <div id="menu">
                    <ul id="menuID">                    
                        {itemMap}

                        <Button style={{marginTop:35}}
                        onClick={()=>{
                            toggleAdd()
                            }}
                        >Add New item</Button>
                    </ul>
                    </div>

                </div>
                <div id='outerRemove' hidden="hidden">
                    <div id='middle'>
                        <div id="popup">
                            <p style={{textAlign:'center',padding:10}}>Are you sure you want to delete this item?</p>
                            <div style={{textAlign:'center',marginTop:60}}>
                                <Button onClick={()=>{
                                toggleCancel()
                                const elements = document.getElementsByClassName("menuItems");
                                for(let x in elements){
                                    console.log(elements[x].getElementsByTagName("p")[0].innerHTML)
                                    console.log(item[0])
                                    console.log(elements[x].getElementsByTagName("p")[1].innerHTML)
                                    console.log(("Price: "+item[1]))
                                    console.log(elements[x].getElementsByTagName("p")[2].innerHTML)
                                    console.log("Quantity: "+parseInt(item[2]))
                                    if((item[0]===elements[x].getElementsByTagName("p")[0].innerHTML)&&((("Price: "+item[1])===elements[x].getElementsByTagName("p")[1].innerHTML))&&"Quantity: "+item[2]==elements[x].getElementsByTagName("p")[2].innerHTML)
                                    {
                                        elements[x].remove()
                                        removeItem()
                                    }
                                }
                            
                                

                            }}>Yes</Button> <Button onClick={toggleCancel}>No</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='outerEdit' hidden="hidden">
                    <div id='middle'>
                        <div id="popUpEdit">
                            <p style={{textAlign:'center',padding:10}}>What would you like to edit?</p>
                            <div style={{textAlign:'center'}}>
                                <input style={{margin:10}} type="text" className="editInputBox" id = "editNameInputBox" placeholder={"Item name: "+item[0]}  onChange={(event)=>{
                                        console.log("something happend")
                                        setItemName(event.target.value)
     
                                }}/>
                                <br/>
                                <input style={{margin:10}} type="number" className="editInputBox" id = "editPriceInputBox" placeholder={"Item price: "+item[1]} onChange={(event)=>{
                                    setItemPrice(event.target.value)
                                }}/>
                                <br/>
                                <input style={{margin:10}} type="number" className="editInputBox" id = "editQuantityInputBox" placeholder={"Item quantity: "+item[2]} onChange={(event)=>{
                                    setItemQuantity(event.target.value)
                                }}/>
                                <br/>
                                <Button style={{margin:10}} onClick={()=>{
                                    toggleEdit()
                                    setNativeValue(document.getElementById("editNameInputBox"),"")
                                    setNativeValue(document.getElementById("editPriceInputBox"),"")
                                    setNativeValue(document.getElementById("editQuantityInputBox"),"")
                                    itemMap
                                    editItem()
                                    const elements = document.getElementsByClassName("menuItems");
                                    for(let x in elements){
                                    if((item[0]===elements[x].getElementsByTagName("p")[0].innerHTML)&&((("Price: "+item[1])===elements[x].getElementsByTagName("p")[1].innerHTML))&&"Quantity: "+item[2]==elements[x].getElementsByTagName("p")[2].innerHTML)
                                    {
                                        elements[x].getElementsByTagName("p")[0].innerHTML = itemName
                                        elements[x].getElementsByTagName("p")[1].innerHTML = "Price: $"+itemPrice
                                        elements[x].getElementsByTagName("p")[2].innerHTML = "Quantity: "+itemQuantity
                                    }
                                }
                                Document.getElementById("editNameInputBox").value="";
                                Document.getElementById("editPriceInputBox").value="";
                                Document.getElementById("editQuantityInputBox").value="";
                                getMenuItems()
                                }}
                                >Yes</Button> <Button style={{margin:10}} onClick={toggleEdit}>No</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='outerAdd' hidden="hidden">
                    <div id='middle'>
                        <div id="popUpAdd">
                            <p style={{textAlign:'center',padding:10}}>Add an item</p>
                            <div style={{textAlign:'center'}}>
                                <input style={{margin:10}} type="text" className="editInputBox" id = "editNameInputBox" placeholder="Item name" onChange={(event)=>{
                                    setItemName(event.target.value)
                                }}/>
                                <br/>
                                <input style={{margin:10}} type="text" className="editInputBox" id = "editPriceInputBox1" placeholder="Item price" onChange={(event)=>{
                                    setItemPrice(event.target.value)
                                }}/>
                                <br/>
                                <input style={{margin:10}} type="text" className="editInputBox" id = "editQuantityInputBox" placeholder="Item quantity" onChange={(event)=>{
                                    setItemQuantity(event.target.value)
                                }}/>
                                <br/>
                                <Button style={{margin:10}} onClick={()=>{

                                    toggleAdd()
                                    addMenuItem()
                                

                                    getMenuItems()

                                }}
                                >Yes</Button> <Button style={{margin:10}} onClick={toggleAdd}>No</Button>
                            </div>
                        </div>
                    </div>
                    </div>
            </>
        )
}   
export default RestaurantProfile
