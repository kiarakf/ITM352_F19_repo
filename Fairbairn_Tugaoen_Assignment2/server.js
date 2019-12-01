//worked with partner Alyssa and with classmates 
//from Lab 13 and Ports Office Hours
var express = require('express'); //requires the express package in the node_modules
var app = express(); //starts express
var myParser = require("body-parser"); //need to use bodyParser() to form data to be available in req.body
var products = require("./public/product_data.js"); //defines the products variable and gets data from the product_data.js array
const querystring = require('querystring'); //gives utilities for parsing and formatting URL query strings

app.use(myParser.urlencoded({ extended: true })); //tells the system to use JSON
fs = require('fs'); //assigns to a fs variable
var filename = 'user_registration_info.json'; //assigns information from the user_registartion_info variable

//from lab 13: logs the method and path into the console
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

//makes sure file exists before loading it in
//returns true or false (boolean)
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

    console.log(users_reg_data);
    //if file doesnt exist this will tell the user that it doesnt
} else {
    console.log(filename + ' does not exist'); //shows the wrong file name + doesnt exist in the message
}


//gets called with data from the form
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body); //diagnostic to see in terminal
    var qString = querystring.stringify(request.query); //string query together 
    inputUser = request.body.username;
    inputPass = request.body.password;
    the_username = request.body.username.toLowerCase(); //give me username from object and assigning it


    if (typeof users_reg_data[the_username] != 'undefined') { //ask object if it has property called username, if it does, it wont be udefined. check to see if it exists
        if (users_reg_data[the_username].password == request.body.password) {//check if the password they entered matches what was stored
            //passes the username + the string logged in on the page to greet them

             //assigns the username, email and fullname into variables
             loginFullname = users_reg_data[the_username].name;
             loginEmail = users_reg_data[the_username].email;
             loginUserName = request.body.username;
             //retrieve variable values and puts it into query
             request.query.stickFullname = loginFullname;
             request.query.stickEmail = loginEmail;
             request.query.stickUsername = loginUserName;
             //strings query together
             qString = querystring.stringify(request.query);
             response.redirect("./invoice.html?" + qString); //if the quantity is valid, user is directed to invoice along with the query data from the form
        }
        //else if the password of the user name in JSON does not match the password entered
        else if (users_reg_data[the_username].password != request.body.password) {
            error = '<font color= "red"> Incorrect Password </font>'; //sets error to incorrect password, which will display on the page 
            stickInput = inputUser; //assigns the username the user entered into a variable which will let it stick 
        }
        //else the username the user entered and error message is displayed 
    } else {
        error = the_username + "<font color='red'> is not registered</font>"; //shows the error when the username entered is not registered
        stickInput = inputUser //assigns the username the user entered into stick input
    }
    //retrive variable values and puts it into query
    request.query.LoginError = error;
    request.query.logStickInput = stickInput;
    //string query together
    qString = querystring.stringify(request.query);
    //redirect user back to login page with qString
    response.redirect("./login_page.html?" + qString);
});


// process a simple register form
app.post("/register", function (request, response) {

    //string query together
    var qString = querystring.stringify(request.query);

    //defines variable names. takes the input of the user and assigns it to a variable. 
    registerInputUser = request.body.username.toLowerCase(); //assigns the username to make it lowercase
    registerInputFullname = request.body.fullname;
    registerInputPassword = request.body.password;
    registerInputRepPassword = request.body.repeat_password;
    registerInputEmail = request.body.email;
    email = request.body.email.toLowerCase();

    if (registerInputFullname.length > 30) { //defines that the users full name cannot be more than 30 characters
        fullnameErrorReg = '<font color="red">full name must be 30 characherts or less </font>'; //stores errors into variables. if users name is too long, it will display the message "full name is too long"
        registerIncorrectFullName = registerInputFullname; //sticks the input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(registerInputFullname))) { //else if: a regular expression that defines that the users Full name can only consist of letters and spaces
        fullnameErrorReg = '<font color="red">name must be letters only </font>'; //if full name is anything other than letters and spaces it will display the error message "name must be letters only"
        registerIncorrectFullName = registerInputFullname; // sticks the input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else { //else there are no errors
        fullnameErrorReg = '';  //no errors are stored in the variable 
        registerIncorrectFullName = registerInputFullname; //sticks the input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    }

    if (registerInputPassword.length < 6) { //defines that the password has to be longer than 6 characters
        passwordErrorReg = '<font color="red">Password must be more than 6 characters long</font>'; //stores appropriate error into variable
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in varible
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else if (registerInputRepPassword != registerInputPassword) { //defines that password and repeat password must match
        passwordErrorReg = '<font color="red">password does not match</font>'; //if password and repeat password do not match, it will display the message of 'passwords do not match'
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else { //else there are no errors
        passwordErrorReg = ''; //no errors are stores in the variable
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    }

    if (typeof users_reg_data[registerInputUser] != 'undefined') {//check if the username they entered matches what was stored
        usernameErrorReg = '<font color="red">user already registered</font>'; //if username already exists, will display the message of "username already exists"
        registerIncorrectFullName = registerInputFullname; //sticks input from user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else if (!(/^[a-zA-Z0-9]+$/.test(registerInputUser))) { //regular expression stating that the username can only consit of letters and numbers
        usernameErrorReg = '<font color="red">Username must be characters and numbers only</font>'; //if username consists of anything other than letters and numbers, it will display the error message of "useusername must be characters and numbers only" 
        registerIncorrectFullName = registerInputFullname; //sticks input from user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else if (registerInputUser.length > 10) { //else if the username has a maximum of 10 characters
        usernameErrorReg = '<font color="red">Username is too long</font>'; //if username is longer than 10 characters, it will display the message of "username is too long"
        registerIncorrectFullName = registerInputFullname; //sticks input from user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else if (registerInputUser.length < 4) { // else if the username has to be a minimum of 4 characters
        usernameErrorReg = '<font color="red">username is too short</font>'; //if username is too short then it will display the message of "username is too short"
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in varible
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else { //else there are no errors
        usernameErrorReg = ''; //no errors are stored in the variable
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    }

    if (!(/^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/.test(registerInputEmail))) { //regular expression that defines the email address has to have a format of X@Y.Z where: X is the user address which can only contain letters, numbers, and the characters “_” and “.”; Y is the host machine which can contain only letters and numbers and “.” characters; Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”
        emailErrorReg = '<font color="red">Email is invalid</font>'; //if email format is incorrect it will display this message of "email is invalid"
        registerIncorrectFullName = registerInputFullname; //sticks input from the user and store in variable
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    } else { //else there are no errors 
        emailErrorReg = ''; //no errors are stored in the variable
        registerIncorrectFullName = registerInputFullname;
        registerIncorrectUsername = registerInputUser;
        registerIncorrectEmail = registerInputEmail;
    }

    //if there are no errors stored in each error variable, user is stored into JSON 
    if (fullnameErrorReg == '' && passwordErrorReg == '' && usernameErrorReg == '' && emailErrorReg == '') {
        users_reg_data[registerInputUser] = {}; //new user becomes new property of users_reg_data object
        users_reg_data[registerInputUser].name = request.body.fullname; //name entered is stored in users_reg_data object
        users_reg_data[registerInputUser].password = request.body.password; //password entered is stored in users_reg_data object
        users_reg_data[registerInputUser].email = request.body.email; //email entered is stored in users_reg_data object
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //strings data into JSON for users_reg_data

        //retrieve variables and puts them into query
        request.query.stickFullname = registerInputFullname;
        request.query.stickEmail = registerInputEmail;
        request.query.stickUsername = registerInputUser;
        //string query together
        qString = querystring.stringify(request.query);
        //redirect user to invoice page with query string
        response.redirect("./invoice.html?" + qString);

    }
    //retrieve variables and puts them into query; for displaying errors on page
    request.query.RegFullnameError = fullnameErrorReg;
    request.query.RegPasswordError = passwordErrorReg;
    request.query.RegUsernameError = usernameErrorReg;
    request.query.RegEmailError = emailErrorReg;
    //retrieve variables and puts them into query; for sticking user input
    request.query.stickRegFullname = registerIncorrectFullName;
    request.query.stickUsername = registerIncorrectUsername;
    request.query.stickEmail = registerIncorrectEmail;
    //string query together
    qString = querystring.stringify(request.query);
    //redirect user to registration page with qstring
    response.redirect("./registration.html?" + qString);


});
