import './App.css';
import React, {useState} from 'react';
import BusinessSignUp from './Pages/BusinessSignUp.js'
import {Route, Routes} from 'react-router-dom';
import SignUp from './Pages/SignUp';
import RestaurantRedirect from './Pages/restaurantRedirect'
import UserProfile from './Pages/UserProfile'
import RestaurantProfile from './Pages/RestaurantProfile'
import Cart from './Pages/Cart';
import Feed from './Pages/Feed';
import CreateMenuItem from './Pages/createMeal';
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from './imgLogo.png'
import { UserAuthContextProvider } from './authentication/UserAuthContext';
import ProtectedRoute from './Pages/protectedRoute';
import { Button } from 'antd';

export default function App() {

  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem('is-toggle-true')) || false
    );

  const toggler = () => {
    localStorage.setItem('is-toggle-true', JSON.stringify(!toggle));
    setToggle(!toggle);
  }

  return (
    <>
    
    <div clasName="navbar-container">
    <Navbar fixed='top' style={{position:"sticky",backgroundColor:"white"}} className="component-container">
      <ul>
        <Container>
          <Nav.Link href="/feed">
            <img
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Nav.Link>
        </Container>
      </ul>
      <ul>
        <Nav.Link href="/feed">Feed</Nav.Link>
      </ul>
      {toggle ?
      <ul>
        <Nav.Link href="/CreateMenuItem">Create Menu Item</Nav.Link>
      </ul>
      :
      <ul>
        <Nav.Link href="/cart">Cart</Nav.Link>
      </ul>
      }
      {toggle ?
      <ul>
        <Nav.Link href="/restaurantprofile">Restaurant Profile</Nav.Link>
      </ul>
      :
      <ul>
        <Nav.Link href="/userprofile">User Profile</Nav.Link>
      </ul>
      }
      <div className='profile-container'>
      <ul>
      <Button onClick={toggler}>
      {toggle ? 
        <h6>
        <img src="https://static.skipthedishes.com/barakat-restaurant-western-road-list-image-mobile-1525366654818.png" height={18} width={18}/>
        {" "}Barakat</h6>
        :
        <h8>
        <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" height={25} width={25}/>
        {" "}</h8>
      }
      </Button>
      </ul>
      </div>

    </Navbar>
    </div>

    <div className="page-container">
    <UserAuthContextProvider>

    <Routes>
      <Route path='/' element={<SignUp/>}>  </Route>
      <Route path='/restaurantRedirect' element={<RestaurantRedirect/>}></Route>
      <Route path='/BusinessSignUp' element={<BusinessSignUp/>}></Route>
      <Route path='/userprofile' element={
      <ProtectedRoute>
        <UserProfile/>
      </ProtectedRoute>
        }></Route>
      <Route path='/restaurantprofile' element={
      <ProtectedRoute>
        <RestaurantProfile/>
      </ProtectedRoute>
      }>  </Route>
      <Route
            path="/Feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
      <Route path='/CreateMenuItem' element={
      <ProtectedRoute>
        <CreateMenuItem/>
      </ProtectedRoute>
      }></Route>
      <Route path='/Cart' element={
      <ProtectedRoute>
        <Cart/>
      </ProtectedRoute>
        }></Route>
    </Routes>

    </UserAuthContextProvider>
    </div>
   
  </>
  
  );
}
