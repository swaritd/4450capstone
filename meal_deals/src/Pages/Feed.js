import './../App.css';
import React, {Component, useState} from 'react';
import Axios from 'axios'
import { useUserAuth } from '../authentication/UserAuthContext';
import { Button, Input, List, Table } from 'antd';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

class MealsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuID: 1,
      menuItems: [],
      userID: 1,
      itemQuantity: 1
    }
  }

  componentDidMount() {
    Axios.post('http://localhost:1001/getMenuData',{
        menuID: this.state.menuID
    }).then(() => {
        console.log("Successfully sent to db")
    })

    Axios.get('http://localhost:1001/menu').then(resp => {
      this.setState({
        menuItems: resp.data
      });
    });
  }

  signOutFunc = async () => {
    const result = await signOut(auth);
    console.log('did logout happen? ', result)
  }

  handleAddToCart = (item) => {


    //console.log(item)
    //console.log(menuItems.restaurantID)
    //const itemToUpdate = this.state.menuItems.find(menuItem => menuItem.itemName === item.itemName);
    const itemToUpdate = this.state.menuItems.find(menuItem => menuItem.itemID === item.itemID);

    Axios.post('http://localhost:1001/addToCart', {
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    itemQuantity: this.state.itemQuantity,
    itemID: itemToUpdate.itemID, // itemID: item.itemID,
    restaurantID: itemToUpdate.restaurantID,
    userID: this.state.userID
  }).then(() => {
    console.log("Successfully added item to cart")
  })
  }

  render() {
    const columns = [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName',
        width: '50%'
      },
      {
        title: 'Price',
        dataIndex: 'itemPrice',
        key: 'itemPrice',
        width: '20%',
        align: 'right'
      },
      {
        title: 'Quantity',
        dataIndex: 'itemQuantity',
        key: 'itemQuantity',
        width: '20%',
        align: 'right'
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={() => this.handleAddToCart(record)}>
            Add to Cart
          </Button>
        )
      }
    ];

    return (
      <>
        <div>
          <Button onClick={this.signOutFunc} style={{ margin: 10 }}>Sign Out</Button>
        </div>
        <h2>Meals Available Now</h2>
        <Table dataSource={this.state.menuItems} columns={columns} pagination={false} />
      </>
    );
  }
}

export default MealsFeed;


/*

handleAddToCart = (item) => {

    //console.log(item)
    //console.log(menuItems.restaurantID)
    //const itemToUpdate = this.state.menuItems.find(menuItem => menuItem.itemName === item.itemName);
    const itemToUpdate = this.state.menuItems.find(menuItem => menuItem.itemID === item.itemID);

    Axios.post('http://localhost:1001/addToCart', {
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    itemQuantity: this.state.itemQuantity,
    itemID: itemToUpdate.itemID, // itemID: item.itemID,
    restaurantID: itemToUpdate.restaurantID,
    userID: this.state.userID
  }).then(() => {
    console.log("Successfully added item to cart")
  })
  }
*/

