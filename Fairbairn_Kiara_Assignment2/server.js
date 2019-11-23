//from Lab 13 and Ports Office Hours
var express = require('express'); //requires the express package in the node_modules
var app = express(); //starts express
var myParser = require("body-parser"); //need to use bodyParser() to form data to be available in req.body
var products = require("./public/product_data.js"); //defines the products variable and gets data from the product_data.js array
const querystring = require('querystring'); //gives utilities for parsing and formatting URL query strings

app.use(myParser.urlencoded({ extended: true }));
fs = require('fs');
var filename = 'user_registration_info.json';

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

//from Lab 13 and Ports Office Hours
app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
    let POST = request.body; //
    var hasValidQuantities = true; //defining the hasValidQuantities variable and assuming all quantities are valid
    var hasPurchases = false; //assume the quantity of purchases are false
    for (i = 0; i < products.length; i++) { //for loop for each product array that increases the count by 1
        q = POST['quantity' + i]; //quantity entered by the user for a product is aessigned into q
        if (isNonNegInt(q) == false) { //if the quantity enetered by the user is invalid integer
            hasValidQuantities = false; //hasValidQuantities is false or nothing was inputed in the quantity textbox
        }
        if (q > 0) { //if quantity entered in the textbox is greater than 0
            hasPurchases = true; //if q is greater than 0 than the hasPurchases is ok
        }
    }
    //if data is valid give user an invoice, if not give them an error
    qString = querystring.stringify(POST); //string query together
    if (hasValidQuantities == true && hasPurchases == true) { //if both hasValidQuantities variable and hasPurchases variable are valid 
        response.redirect('./login_page.html?' + qString); //if quantity is valid it will send user to invoice
    }
    else {
        response.redirect("./products_display.html?" + qString); //if quantity is invalid it will send user back to products page
    }
});


//taken from Lab 13
app.use(express.static('./public'));  //takes get request and look for file in public directly
app.listen(8080, () => console.log(`listening on port 8080`)); //makes the server listen on Port 8080 and print smessage into console

//copied from order_page
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == '') { q = 0 }; //if quantity is empty or 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); //returns error if any
}

//
//check to see if the file exists. if it does, read it and parse it. if not output a message
if (fs.statSync(filename)) {

    //returns contents of the path
    data = fs.readFileSync(filename, 'utf-8');

    stats = fs.statSync(filename);
    console.log(filename + ' has ' + stats.size + ' characters'); //console logs the filename with the amount of characters it has


    users_reg_data = JSON.parse(data);//parses the data into JSON format
    /*
    username = 'newuser';
    users_reg_data[username] = {}; //new user becomes new property of users_reg_data object
    users_reg_data[username].password = 'newpass';
    users_reg_data[username].email = 'newuser@user.com';
    fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    */

    console.log(users_reg_data); //console logs

} else {
    console.log(filename + ' does not exist');
}


//gets called with data from the form
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    the_username = request.body.username; //give me username from object and assigning it
    if (typeof users_reg_data[the_username] != 'undefined') { //ask object if it has property called username, if it does, it wont be udefined. check to see if it exists
        if (users_reg_data[the_username].password == request.body.password) {//check if the password they entered matches what was stored
            //passes the username + the string logged in on the page to greet them
            response.redirect("./invoice.html?" + qString);//if the quantity is valid, user is directed to invoice along with the query data from the form
        } else if (users_reg_data[the_username].password != request.body.password) {
            response.send('password incorrect');//if they did not login successfully, does another get request and redirects user to login to page
            //can regnerate form here and display errors
        }
    } else if (the_username.length == 0 || request.body.password == 0) {
        response.send('please enter a username and password');
    } else {
        response.redirect('/register?' + qString);
    }

});

app.get("/register", function (request, response) { //if server gets request to register
    // Give a simple register form
    //when submit, posts to register, then calls app.post
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="full_name" size="40" placeholder="enter full name"> 
        <label id="fullNamelabel" class=""> Full Name </label> <br/>
        <input type="text" name="username" size="40" placeholder="enter username"> 
        <label id="usernameLabel" class=""> username </label> <br/>
        <input type="password" name="password" size="40" placeholder="enter password">
        <label id="passwordLabel" class=""> password </label> <br/>
        <input type="password" name="repeat_password" size="40" placeholder="enter password again">
        <label id="repeatpasswordLabel" class=""> Repeat Password </label> <br/>
        <input type="email" name="email" size="40" placeholder="enter email">
        <label id="emaillabel" class=""> Email </label> <br/>
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form

    //validate registration data

    //all good, so save new user to the file name(registration data)
    username = 'newuser';
    username = request.body.username.toLowerCase(); //makes the username insensitive
    full_name = request.body.full_name();
    email = request.body.email.toLowerCase();
    if (typeof users_reg_data[username] != 'undefined') {//check if the password they entered matches what was stored
        response.redirect('/login_page.html?' + qString);//if they did not login successfully, does another get request and redirects user to login to page
        //can regnerate form here and display errors
    } else if (request.body.full_name > 30) {
        response.send ('your username is too long')
    } else if (!(/^[a-zA-Z]+$/.test(fullname))) {
        response.send('username must only be characters')
    } else if (request.body.password.length <6 ){
        response.send ('password must be a minimum of 6 characters')
    } else if (request.body.repeat_password != request.body.password) {
        response.send(`password does not match`);
    } else if (!(/^[a-zA-Z0-9]+$/.test(username))) { //code from my sister-in-law
        response.send('username can only consist of characters and numbers');
    } else if (username.length < 4){
        response.send('username must be a minimum of 4 characters');
    } else if (username.length > 10){
        response.send('username can not be more than 10 characters');
    } else if (!(/^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/.test(email))) { //code from sister in law. [a-zA-Z0-9._]+ this means letters or numbers or “.” or “_” + theres an @. [a-zA-Z.]+ this means letters or numbers or ".". \. this means “.”. a-zA-Z]{2,3} this means 2 or 3 letters.
        response.send ('email must meet the requirements. <br> The requirements are: <br> 1. email must be  in an X@Y.Z format where X is the user address which can only contain letters, numbers, and the characters “_” and “.” <br> 2. Y is the host machine which can contain only letters and numbers and “.” characters <br>3. Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”.')
    } else {
        users_reg_data[username] = {}; //new user becomes new property of users_reg_data object
        users_reg_data[username].name = request.body.name;
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;
        fs.writeFileSync(filename, JSON.stringify(users_reg_data));
        //alert(`${username} registered!`)
        response.redirect("/invoice.html?" + qString);
        //response.redirect ("./invoice.html?" + qString );//if the quantity is valid, user is directed to invoice along with the query data from the form
        console.log(request.body);
    }

});



