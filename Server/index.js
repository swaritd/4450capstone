const express = require('express')
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'4450'
})
app.listen(1001,()=>{
    console.log("Running on port 1001")
})

app.get('/', (req, res) => {
    res.send('Hello World!')
});

//==================================================================================================

let resIDSession = 0;

app.post('/createRestaurant',(req,res)=>{
    const restaurantName = req.body.restaurantName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    db.query('INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES (?,?,?)',
    [restaurantName,phoneNumber,address], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Values inserted into restaurants")
        }
    })
})

app.post('/getResData',(req,res) =>{
    resIDSession = req.body.resID;
    console.log(req.body)
})

app.get("/restaurants", (req, res) => { //see list of all currently available restaurants
    const resID = resIDSession
    /*const sqlSelect =
        `SELECT restaurantName, street, postalCode, category, rating
        FROM Restaurant r
        WHERE ???
        ORDER BY r.restaurantName`; //or by proximity however u do that, not sure what columns in this table either
        */
        const sqlSelect =
        `SELECT restaurantName, phoneNumber, address
        FROM restaurants
        WHERE restaurantID = ?`
  
    db.query(sqlSelect,[resID], (err, result) => { //idk if i did this right, only have done this with a variable passed through
      if (err) {
        console.error(err);
        res.status(500).json({});
        return
      }
      console.log(result);
      res.json(result);
    })
})

app.post('/editRestaurant',(req,res)=>{
    const restaurantName = req.body.restaurantName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const restaurantID = req.body.restaurantID;

    const sqlUpdate = 
        `UPDATE restaurants
        SET restaurantName = ?, phoneNumber = ?, address = ?
        WHERE restaurantID = ?`; 

    db.query(sqlUpdate, [restaurantName, phoneNumber, address, restaurantID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row deleted from restaurants")
        }
    })
})

app.post('/deleteRestaurant',(req,res)=>{
    const restaurantID = req.body.restaurantID;

    const sqlDelete = 
        `DELETE FROM restaurants
        WHERE restaurantID = ?`; 

    db.query(sqlDelete, [restaurantID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row deleted from restaurants")
        }
    })
})

//=================================================================================================

app.post('/addMenuItem',(req,res)=>{
    const itemName = req.body.itemName; //not sure if it should be this or req.query.itemName
    const itemPrice = req.body.itemPrice;
    const itemQuantity = req.body.itemQuantity;
    const restaurantID = req.body.restaurantID;

    const sqlInsert = 
        `INSERT INTO menu (itemName, itemPrice, itemQuantity, restaurantID)
        VALUES (?,?,?,?)`; //seems simple enough, think it works maybe sorta 

    db.query(sqlInsert, [itemName, itemPrice, itemQuantity, restaurantID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row inserted into menu")
        }
    })
})

app.post('/getMenuData',(req,res) =>{
    menuIDSession = req.body.menuID;
    console.log(req.body.menuID)
})

app.get('/getMenuItems',(req,res)=>{ //see the current menu listings of a specific restaurant
    const menuID = resIDSession
        const sqlSelect =
        `SELECT itemName, itemPrice, itemQuantity, itemID
        FROM menu
        WHERE restaurantID = ?`
    db.query(sqlSelect, [menuID], (err,result) => {
        if(err){
            console.error(err);
            res.status(500).json({}); 
            return
        }
        console.log(result);
        res.json(result);
    })
})

app.get('/getMenuItem/:itemID', (req, res) => {
    const sqlSelect =
      `SELECT itemQuantity
       FROM menu
       WHERE itemID = ?`;
  
    const itemID = req.params.itemID; // Get itemID from URL parameter
  
    db.query(sqlSelect, [itemID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({});
        return;
      }
      console.log(result);
      res.json(result);
    });
  });

//app.get('/:restaurantName/menu',(req,res) =>{ // same as line below but with route parameters, not sure if work will test when i can
app.get('/menu',(req,res)=>{ //see the current menu listings of a specific restaurant
    const menuID = menuIDSession
    /*const sqlSelect = 
        `SELECT m.itemName, m.price, m.quantity 
        FROM restaurants r, menu m
        WHERE r.name = ?
        ORDER BY m.itemName`; //not sure exactly what columns to select until i see db myself
        */
        const sqlSelect =
        `SELECT itemName, itemPrice, itemQuantity, itemID, restaurantID
        FROM menu
        ORDER BY itemID DESC
        LIMIT 40` // just to not overload db query
    db.query(sqlSelect, [menuID], (err,result) => {
        if(err){
            console.error(err);
            res.status(500).json({}); 
            return
        }
        console.log(result);
        res.json(result);
    })
})

app.post('/editMenuItem',(req,res)=>{
    const itemName = req.body.itemName; //not sure if it should be this or req.query.itemName
    const itemPrice = req.body.itemPrice;
    const itemQuantity = req.body.itemQuantity;
    const itemID = req.body.itemID;

    const sqlUpdate = 
        `UPDATE menu
        SET itemName = ?, itemPrice = ?, itemQuantity = ?
        WHERE itemID = ?`;

    db.query(sqlUpdate, [itemName, itemPrice, itemQuantity,itemID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row updated from menu")
        }
    })
})

app.post('/editMenuItemQuantity',(req,res)=>{
    const itemID = req.body.itemID;

    const sqlUpdate = 
        `UPDATE menu
        SET itemQuantity = itemQuantity - 1
        WHERE itemID = ?`;

    db.query(sqlUpdate, [itemName, itemPrice, itemQuantity,itemID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row updated from menu")
        }
    })
})

app.post('/deleteMenuItem',(req,res)=>{
    const itemID = req.body.itemID;

    const sqlDelete = 
        `DELETE FROM menu
        WHERE itemID = ?`; //make sure to test by running same statement, but replace delete with select before excecuting

    db.query(sqlDelete, [itemID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row deleted from menu")
        }
    })
})

//=================================================================================================


//either have a global cart that is queried by userID or you could create a cart table for each user
//seperately, for few users a couple new tables is nothing, but more users = many more tables


app.post('/addToCart',(req,res)=>{ //in theory you have a button next to each menu item that grabs
    const itemID = req.body.itemID;
    const itemName = req.body.itemName; //not sure if it should be this or req.query.itemName
    const itemPrice = req.body.itemPrice;
    const itemQuantity = req.body.itemQuantity;
    const restaurantID = req.body.restaurantID;
    const userID = req.body.userID; //this is the only thing that is different from the menu table,
    //editing your own cart, the table is queried with your userID

    const sqlInsert = 
        `INSERT INTO cart (itemName, itemPrice, itemQuantity, itemID, restaurantID, userID)
        VALUES (?,?,?,?,?,?)`; //seems simple enough, think it works maybe sorta

    db.query(sqlInsert, [itemName, itemPrice, itemQuantity, itemID, restaurantID, userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row inserted into cart")
        }
    })
})

app.get(`/Cart/:userID`,(req,res)=>{ //see items currently added in a specific users cart
    const userID = req.params.userID;

    const sqlSelect = 
        `SELECT *
        FROM cart
        WHERE userID = ${userID}`;

    db.query(sqlSelect, (err,result) => {
        if(err){
            console.error(err);
            console.log("???")
        }
        res.send(result)
    })
})

/*
app.get(`/CheckCart/:userID`,(req,res)=>{ //see items currently added in a specific users cart
    const userID = req.params.userID;
    const itemID = req.query.itemID;

    const sqlSelect = 
        `SELECT *
        FROM cart
        WHERE userID = ? AND itemID = ?`;

    db.query(sqlSelect, [userID, itemID], (err,result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error checking cart");
        }
        res.send(result)
    })
})
*/

app.post('/checkCart', (req, res) => {
    const userID = req.body.userID;
    const itemID = req.body.itemID;
  
    const sqlSelect = 
      `SELECT *
      FROM cart
      WHERE userID = ${userID} AND itemID = ${itemID}`;
  
    db.query(sqlSelect, (err,result) => {
      if(err){
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    })
  })


app.post('/editCart',(req,res)=>{
    const itemQuantity = req.body.itemQuantity;
    const userID = req.body.userID; 

    const sqlUpdate = 
        `UPDATE cart
        SET itemQuantity = ?
        WHERE userID = ?`; //you cant really edit that much given an item already in your cart

    db.query(sqlInsert, [itemQuantity, userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row updated from cart")
        }
    })
})

app.put('/updateItemInCart/:itemID', function(req, res) {
    var itemID = req.params.itemID;
    var newQuantity = req.body.itemQuantity;
    var userID = req.body.userID;
    
    var sql = "UPDATE cart SET itemQuantity = ? WHERE itemID = ? AND userID = ?";
    db.query(sql, [newQuantity, itemID, userID], function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });

app.post('/deleteItemFromCart',(req,res)=>{
    const itemID = req.body.itemID;
    const userID = req.body.userID; 

    const sqlDelete = 
        `DELETE FROM cart
        WHERE itemID = ? AND userID = ?`; //make sure to test by running same statement, but replace delete with select before excecuting

    db.query(sqlDelete, [itemID, userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row deleted from cart")
        }
    })
})

//==================================================================================================

//Added variables to store user information
let userIDSession = 0;

app.post('/createUser',(req,res) =>{
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword; //not sure if this should be here or if we gotta encrypt or hash it first or smth
    const userID = req.body.userID;

    const sqlInsert = 
        `INSERT INTO users(userEmail, userPassword, userID)
        VALUES (?,?,?)`; //can add address and other values later in an update, this statement can be for when users are initially signing up
        //stuff like phone # and adress can be default set to null or smth and get the user to 
        //add them once they are logged in to the application

    db.query(sqlInsert, [userEmail, userPassword, userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row inserted into users")
        }
    })
})

app.post('/getUserData',(req,res) =>{
    userIDSession = req.body.userID;
    console.log(userIDSession);
})

app.get('/user',(req,res) =>{
    const userID = userIDSession;
    console.log(req.body);

    /*const sqlSelect = 
        `SELECT userEmail, userAdress, userPhoneNumber
        FROM users
        WHERE userID = ?`; //theres prolly other things to select, like payment methods, order history? and others, will add more when i know more
        */
        const sqlSelect = 
        `SELECT userEmail, userAddress, userPhoneNumber
        FROM users
        WHERE userID = ?`; //theres prolly other things to select, like payment methods, order history? and others, will add more when i know more

        
    db.query(sqlSelect, [userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send((result))
        }
    })
})

app.post('/editUser',(req,res)=>{
    const userEmail = req.body.userEmail;
    const userPhoneNumber = req.body.userPhoneNumber;
    const userAddress = req.body.userAddress;
    const userID = req.body.userID;

    const sqlUpdate = 
        `UPDATE users
        SET userEmail = ?, userPhoneNumber = ?, userAddress = ?
        WHERE userID = ?`;

    db.query(sqlUpdate, [userEmail, userPhoneNumber, userAddress, userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("1 row updated from users")
        }
    })
})

app.post('/deleteUser',(req,res) =>{
    const userID = req.body.userID;

    const sqlDelete = 
    `DELETE FROM users
    WHERE userID = ?`;

    db.query(sqlDelete, [userID], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send('1 row deleted from users')
        }
    })
})