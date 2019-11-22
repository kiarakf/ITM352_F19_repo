//from Lab 13 and Ports Office Hours
var express = require('express'); //requires the express package in the node_modules
var app = express(); //starts express
var myParser = require("body-parser"); //need to use bodyParser() to form data to be available in req.body
var products = require ("./public/product_data.js"); //defines the products variable and gets data from the product_data.js array
const querystring = require('querystring'); //gives utilities for parsing and formatting URL query strings

app.use(myParser.urlencoded({ extended: true }));

var fs = require('fs'); //assigns to a fs variable
var filename = 'user_registration_info.json'; //assigns information to a variable

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
        q = POST ['quantity' +i]; //quantity entered by the user for a product is aessigned into q
        if (isNonNegInt(q) == false){ //if the quantity enetered by the user is invalid integer
            hasValidQuantities = false; //hasValidQuantities is false or nothing was inputed in the quantity textbox
        }
        if (q>0) { //if quantity entered in the textbox is greater than 0
            hasPurchases = true; //if q is greater than 0 than the hasPurchases is ok
        }
    }
    //if data is valid give user an invoice, if not give them an error
     qString = querystring.stringify (POST); //string query together
     if (hasValidQuantities == true && hasPurchases == true) { //if both hasValidQuantities variable and hasPurchases variable are valid 
        response.redirect ("./login_page.html" + qString ); //if quantity is valid it will send user to invoice
    }
    else {
        response.redirect ("./products_display.html?" + qString); //if quantity is invalid it will send user back to products page
    }
});

//makes sure file exists before loading it in
//returns true of false (boolean)
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + ' characters');

    data = fs.readFileSync(filename, 'utf-8') //opens and reas file name in utf-8 encoding format. blocking function
    users_reg_data = JSON.parse(data) //convert json fild into an object 

    /*
    username = 'newuser';
    users_reg_data[username] = {};
    users_reg_data[username].password = 'newpass';
    users_reg_data[username].email = 'newuser@user.com';
    
    fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //turns this into a JSON string data
    */

    console.log(users_reg_data);
}
//if file doesnt exist this will tell the user that it doesnt
else {
    console.log(filename + 'does not exist!'); //shows the wrong file name + doesnt exist in the message
}


//if server listening on 8080 gets a GET request on login, it will run this code. USE THIS FOR ASSIGNMENT 2 
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

//if server gets a POST request, this is where we will process it
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body); //diagnostic to see in terminal
    the_username = request.body.username; //give me username from this object. object comes from the form whos name are in the inputs of the properties

    //if type of username is not undefined. checking to see if it exists 
    if (typeof users_reg_data[the_username] != 'undefined') {
        //if it does exist get the password and see if it is the same
        if (users_reg_data[the_username].password == request.body.password) {
            //if it is the same, send it to 'logged in!' --> in assignment 2 redirect them to the invoice
            response.send(the_username + ' logged in!'); //in assignment 2 send the user to the invoice with the quantity data 
        } //if password is incorrect send them back to login. in assignment 2 make sure you tell the users there is an error (alert button)
        else {
            response.redirect('/login');
        }
    }
});


app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    //need to validate usernames, case sensitive, make password certain length, email proper email address
    //all good so save new user --> make sure in assignment 2 you have them check password. in assignment 2 also need to ask for users name
    username = 'newuser'
    username = request.body.username;


    if (typeof users_reg_data[username] != 'undefined') { //check if the password they entered matches what was stored
        response.redirect('/login'); // if they did not login successfully, does another get request and redirects user to login
        //can regenerate form here and display errors
    } else if (request.body.repeat_password != request.body.password) {
        response.send(`password does not match`);
    } else {
        users_reg_data[username] = {};
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //turns this into a JSON string data
        //in assignment 2 if everything is ok send them to the invoice
        response.send(`${username} registered!`)
        console.log(request.body);
    }

});



//taken from Lab 13
app.use(express.static('./public'));  //takes get request and look for file in public directly
app.listen(8080, () => console.log(`listening on port 8080`)); //makes the server listen on Port 8080 and print smessage into console

//copied from order_page
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q== '') {q=0}; //if quantity is empty or 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); //returns error if any
}