import React, { Component } from 'react';
import Axios from 'axios'
import { Button, Input, Result } from 'antd';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          userID: '1'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleEditInputChange = this.handleEditInputChange.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    }


    componentDidMount(){
        Axios.get(`http://localhost:1001/cart/${1}`,{
        }).then(response => {
            this.setState({ items: response.data});
            console.log("Successfully sent to db")
        })
        .catch(error => console.log(error));
    }

    handleInputChange(event) {
        this.setState({ userID: event.target.value });
    }

    handleEditInputChange(event) {
        this.setState({ itemQuantity: event.target.value });
    }

    
    handleButtonClick = () =>{
        Axios.get(`http://localhost:1001/cart/${this.state.userID}`,{
        }).then(response => {
            this.setState({ items: response.data});
            console.log("Successfully sent to db")
        })
        .catch(error => console.log(error));
    }
      

    handleEditButtonClick = (itemID) => {
      const item = this.state.items.find(item => item.itemID === itemID);
      //this.setState({itemQuantity: item.itemQuantity});
      const newQuantity = this.state.itemQuantity;
    
      Axios.put(`http://localhost:1001/updateItemInCart/${itemID}`, {
        itemQuantity: newQuantity,
        userID: this.state.userID
      })
      .then(response => {
        console.log(response.data);
        this.setState(prevState => ({
          items: prevState.items.map(item => {
            if (item.itemID === itemID) {
              return {
                ...item,
                itemQuantity: newQuantity
              };
            }
            return item;
          })
        }));
      })
      .catch(error => console.log(error));
  }

    handleDeleteButtonClick = (itemID) => {
        Axios.post('http://localhost:1001/deleteItemFromCart', {
          itemID: itemID,
          userID: this.state.userID
        })
          .then(response => {
            console.log(response.data);
            this.setState({ items: [] }, () => {
              Axios.get(`http://localhost:1001/cart/${this.state.userID}`)
                .then(response => {
                  this.setState({ items: response.data });
                })
                .catch(error => console.log(error));
            });
          })
          .catch(error => console.log(error));
    }

        render() {
            return (
<div className="d-flex justify-content-center">
      <div className="container">
      <div className="row mt-3">
          <div className="col-md-4">
            
          </div>
          <div className="col-md-2">
            
          </div>
        </div>

        {this.state.items.length > 0 &&
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.itemID}>
                  <td>{item.itemName}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemQuantity}</td>
                  <td className="d-flex align-items-center">
                    <Input type="number" id={`quantity-${item.itemID}`} onChange={this.handleEditInputChange} className="me-2" style={{ width: '80px' }} />
                    <Button onClick={() => this.handleEditButtonClick(item.itemID)} size="sm" className="me-2">Update</Button>
                    <button className="btn btn-danger btn-sm" onClick={() => this.handleDeleteButtonClick(item.itemID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
            )};
        //value={this.state.itemQuantity}
      }


export default Cart;

//<label htmlFor="userID" className="form-label">User</label>
//<input type="text" className="form-control" id="userID" value={this.state.userID} onChange={this.handleInputChange} />


//<button className="btn btn-primary mt-4" onClick={this.handleButtonClick}>Search</button>

/*

handleEditButtonClick = (itemID) => {
        const item = this.state.items.find(item => item.itemID === itemID);
        //this.setState({itemQuantity: item.itemQuantity});
        const newQuantity = this.state.itemQuantity;
      
        Axios.put(`http://localhost:1001/updateItemInCart/${itemID}`, {
          itemQuantity: newQuantity,
          userID: this.state.userID
        })
        .then(response => {
          console.log(response.data);
          this.setState(prevState => ({
            items: prevState.items.map(item => {
              if (item.itemID === itemID) {
                return {
                  ...item,
                  itemQuantity: newQuantity
                };
              }
              return item;
            })
          }));
        })
        .catch(error => console.log(error));
    }

*/
