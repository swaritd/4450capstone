import React from 'react';
import Axios from 'axios'
import { Button, Input } from 'antd';

class CreateMenuItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            itemName:" ",
            itemPrice:" ",
            itemQuantity:" ",
            restaurantID:101
        }
      }
      getState = () =>{
        console.log(this.state.itemName+" "+this.state.itemPrice+" "+this.state.itemQuantity+" "+this.state.restaurantID)
      }
      addMenuItem = () =>{
        Axios.post('http://localhost:1001/addMenuItem',{
            itemName:this.state.itemName,
            itemPrice:this.state.itemPrice,
            itemQuantity:this.state.itemQuantity,
            restaurantID:this.state.restaurantID,
        }).then(()=>{
            console.log("Successfully sent to db")
        })
      }
    render() {
        return(
            <>
            <div style={{textAlign:"center",justifyItems:'center',alignItems:"center"}}>
                <h2>Add an Item to the Menu</h2>
                    <label>Item Name:</label>      
                    <br/>                  
                    <Input type="text" name="itemName" style={{width: "370px",marginBottom:25}} placeholder="Item Name"
                    onChange={(event)=>{
                        this.setState((state, props) => {
                            return {itemName: event.target.value};
                            });
                        }} />
                    <br/>
                    <label>Item Price:</label>     
                    <br/>
                    <Input type="text" name="itemPrice" style={{width: "370px",marginBottom:25}} placeholder="Item Price"
                    onChange={(event)=>{
                        this.setState((state, props) => {
                            return {itemPrice: event.target.value};
                            });
                        }} />
                    <br/>
                    <label>Item Quantity:</label>
                    <br/>    
                    <Input type="text" name="itemQuantity" style={{width: "370px",marginBottom:25}} placeholder="Item Quantity"
                    onChange={(event)=>{
                        this.setState((state, props) => {
                            return {itemQuantity: event.target.value};
                            });
                        }} />
                    <br/>
                    
                    <Button onClick={this.getState}>click Me</Button>
                    <Button onClick={this.addMenuItem}>send</Button>
                </div>
            </>
        )
    }
}

export default CreateMenuItem;

/*
<label>Restaurant ID:</label>
                    <br/>    
                    <Input type="text" name="restaurantID" style={{width: "370px",marginBottom:25}} placeholder="Restaurant ID"
                    onChange={(event)=>{
                        this.setState((state, props) => {
                            return {restaurantID: event.target.value};
                            });
                        }} />
                    <br/>
*/