import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BusinessSignUp from './BusinessSignUp';
import Axios from 'axios'
import { Button, Input } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css"

class RestaurantRedirect extends React.Component {
    

  
    
    

  

    

    

    render() {
        return(
            
            <div className="App">
                <h2 style={{}}>Restaurant Welcome</h2>
      <p style={{}}>Login or signup to get started!</p>
        
        <br />
        
        <div div style={{ lineHeight: '40px'}}>
        

        <div>
<img height={150} src="mealDealsLogo.png"/>
</div>

       

        <Link to="/BusinessSignUp">
          <Button className='defaultBtn' >New User</Button>
        </Link>
        <br></br>
        <Link to="/BusinessSignUp">
          <Button className='defaultBtn' >Returning User</Button>
        </Link>
        <br></br>
        </div>

        <br />
        <Link to="/">
          <Button className='defaultBtn' >I'm a Customer</Button>
        </Link>
        
      </div>
        )
    }
}

export default RestaurantRedirect
